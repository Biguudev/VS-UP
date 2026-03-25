let obj;

try {
  obj = JSON.parse($response.body);
} catch (e) {
  $done({ body: $response.body });
}

if (!obj || typeof obj !== "object") {
  $done({ body: $response.body });
}

obj.properties = obj.properties || {};
obj.properties.tags = obj.properties.tags || {};

const now = Math.floor(Date.now() / 1000);
const oneYearLater = now + 60 * 60 * 24 * 365;

// keep original tags, only patch subscription-related ones
obj.properties.tags.subscription_status = "premium";
obj.properties.tags.subscription_plan = "monthly";
obj.properties.tags.user_type = "vip";
obj.properties.tags.subscription_active_since = String(now);
obj.properties.tags.subscription_expiring_date = String(oneYearLater);
obj.properties.tags.subscription_expiring_grace_period = "false";
obj.properties.tags.subscription_cancelled = "false";
obj.properties.tags.eligibility = "none";

// optional helpers
if (!obj.properties.tags.recurring_payments) {
  obj.properties.tags.recurring_payments = "1";
}

// don't force historical fields unless needed
// obj.properties.tags.has_paid = "true";

$done({ body: JSON.stringify(obj) });