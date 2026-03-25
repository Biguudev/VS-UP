let obj;

try {
  obj = JSON.parse($request.body || "{}");
} catch (e) {
  $done({});
}

obj.properties = obj.properties || {};
obj.properties.tags = obj.properties.tags || {};

const now = Math.floor(Date.now() / 1000);
const oneYearLater = now + 60 * 60 * 24 * 365;

obj.properties.tags.subscription_status = "premium";
obj.properties.tags.subscription_plan = "monthly";
obj.properties.tags.user_type = "vip";
obj.properties.tags.subscription_active_since = String(now);
obj.properties.tags.subscription_expiring_date = String(oneYearLater);
obj.properties.tags.subscription_expiring_grace_period = "false";
obj.properties.tags.subscription_cancelled = "false";
obj.properties.tags.eligibility = "none";

if (!obj.properties.tags.recurring_payments) {
  obj.properties.tags.recurring_payments = "1";
}

$done({ body: JSON.stringify(obj) });