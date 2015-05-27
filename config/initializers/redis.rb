# Set redis instance to a global variable.
$redis = Redis::Namespace.new('tic_tac_toe', redis: Redis.new)
