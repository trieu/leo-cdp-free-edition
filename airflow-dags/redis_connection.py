import redis
from pipeline_config import DEFAULT_REDIS_HOST, DEFAULT_REDIS_PORT, DEFAULT_REDIS_DB


# Establish connection to Redis
def connect_to_redis():
    r = redis.StrictRedis(
        host=DEFAULT_REDIS_HOST,
        port=DEFAULT_REDIS_PORT,
        db=DEFAULT_REDIS_DB,
        decode_responses=True
    )
    return r