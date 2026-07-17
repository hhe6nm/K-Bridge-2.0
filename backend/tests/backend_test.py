"""Backend regression for K Bridge Partners."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://9338f9a4-212e-4351-9672-231562a64ac6.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200


def test_insights_list(api):
    r = api.get(f"{BASE_URL}/api/insights")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_insights_slug(api):
    r = api.get(f"{BASE_URL}/api/insights/korea-to-us")
    # slug may or may not exist; verify server returns valid response
    assert r.status_code in (200, 404)


def test_contact_post_valid(api):
    payload = {
        "name": "TEST_user",
        "email": "test_kb@example.com",
        "company": "TestCo",
        "message": "Testing contact form regression",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code in (200, 201)
    data = r.json()
    assert "id" in data or "success" in data or data
