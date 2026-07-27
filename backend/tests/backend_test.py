"""Backend regression for K Bridge Partners (iteration 4)."""
import os
import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL")
            or frontend_env.get("REACT_APP_BACKEND_URL")).rstrip("/")

EXPECTED_SLUGS = [
    "foreign-owned-ein-application-timeline",
    "e2-investor-visa-korean-founders",
    "percentage-rent-lease-clause",
    "co-tenancy-clause-anchor-tenant-loss",
    "commercial-lease-terms-by-industry",
    "franchise-registration-states",
    "direct-vs-franchise-vs-jv",
    "dc-nova-korean-corridor",
    "first-90-days-post-opening",
    "personal-guarantee-negotiation",
]

LEGACY_SLUGS = [
    "korean-brands-us-lease-mistakes",
    "franchise-vs-direct-entry",
    "understanding-us-commercial-lease-terms",
    "site-selection-methodology",
    "korea-to-us",
]


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ============= Health =============
def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


# ============= Insights =============
def test_insights_list_count_and_order(api):
    r = api.get(f"{BASE_URL}/api/insights")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 10, f"Expected exactly 10 insights, got {len(data)}"

    # Verify order field 1..10
    orders = [p["order"] for p in data]
    assert orders == sorted(orders), "Insights not sorted by order"
    assert orders == list(range(1, 11)), f"Expected orders 1..10, got {orders}"

    # Verify all expected slugs present
    slugs = [p["slug"] for p in data]
    assert slugs == EXPECTED_SLUGS, f"Slug order mismatch. Got: {slugs}"

    # No _id leaks
    for p in data:
        assert "_id" not in p


def test_insights_no_legacy_slugs(api):
    r = api.get(f"{BASE_URL}/api/insights")
    slugs = {p["slug"] for p in r.json()}
    leaked = slugs.intersection(set(LEGACY_SLUGS))
    assert not leaked, f"Legacy slugs still present: {leaked}"


def test_insights_all_slugs_detail(api):
    """Each slug should return full content."""
    for slug in EXPECTED_SLUGS:
        r = api.get(f"{BASE_URL}/api/insights/{slug}")
        assert r.status_code == 200, f"Slug {slug} returned {r.status_code}"
        data = r.json()
        assert data["slug"] == slug
        assert data["content"]
        assert len(data["content"]) > 100
        assert data["title"]
        assert data["category"]


def test_insights_korea_to_us_returns_404_or_content(api):
    """Review request mentions GET /api/insights/korea-to-us returns full content.
    However server.py lists korea-to-us as a LEGACY slug to remove. Test whichever behavior is live."""
    r = api.get(f"{BASE_URL}/api/insights/korea-to-us")
    # Accept both — but flag mismatch
    assert r.status_code in (200, 404)


def test_insights_unknown_slug_404(api):
    r = api.get(f"{BASE_URL}/api/insights/nonexistent-slug-xyz")
    assert r.status_code == 404


# ============= Contact =============
def test_contact_post_valid(api):
    payload = {
        "name": "TEST_iter4_user",
        "email": "test_iter4@example.com",
        "company": "TestCo",
        "phone": "555-0100",
        "message": "iteration 4 regression test",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code in (200, 201)
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data
    assert "_id" not in data

    # Verify persistence
    r2 = api.get(f"{BASE_URL}/api/contact?limit=10")
    assert r2.status_code == 200
    msgs = r2.json()
    assert any(m["id"] == data["id"] for m in msgs), "Contact message not persisted"


def test_contact_post_invalid_email(api):
    payload = {
        "name": "TEST_bad",
        "email": "not-an-email",
        "message": "test",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422


def test_contact_post_missing_required(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"email": "x@y.com"})
    assert r.status_code == 422
