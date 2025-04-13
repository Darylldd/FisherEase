// utils/Notification.js
class Notification {
    // Send notification to user and admin about the violation
    static sendViolationNotification(user_id, violation_type) {
        // Logic to send email and/or SMS notification
        console.log(`Notified user ${user_id} and admin about violation: ${violation_type}`);
    }

    // Notify user about the resolution of their violation
    static sendResolutionNotification(violation_id) {
        // Logic to notify user that their violation was resolved
        console.log(`Notified user about resolution of violation: ${violation_id}`);
    }

    // Notify admin about the user's appeal
    static sendAppealNotification(violation_id) {
        // Logic to notify admin about the appeal
        console.log(`Admin notified about violation appeal: ${violation_id}`);
    }
}

module.exports = Notification;
