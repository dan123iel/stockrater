import time

_cache: dict = {}


def cached(key: str, ttl: int):
    if key in _cache:
        data, ts = _cache[key]
        if time.time() - ts < ttl:
            return data
    return None


def set_cache(key: str, data, ttl: int):
    _cache[key] = (data, time.time())
    return data


def clear_cache():
    _cache.clear()
