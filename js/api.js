/* 
  ShareGear - Mock API Layer
*/

const API = {
    // Base delay to simulate network latency
    delay: 500,

    async fetch(url) {
        // Determine if we are in a subdirectory
        const isSubPage = window.location.pathname.includes('/pages/');
        const basePath = isSubPage ? '../' : '';
        
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const response = await fetch(basePath + url);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    resolve(data);
                } catch (error) {
                    console.error('API Fetch Error:', error);
                    reject(error);
                }
            }, this.delay);
        });
    },

    async getEquipment() {
        return this.fetch('data/equipment.json');
    },

    async getProviders() {
        return this.fetch('data/providers.json');
    },

    async getBookings() {
        return this.fetch('data/bookings.json');
    },

    async getMessages() {
        return this.fetch('data/messages.json');
    },

    async getAdminDashboard() {
        return this.fetch('data/admin-dashboard.json');
    },

    async getAdminUsers() {
        return this.fetch('data/admin-users.json');
    },

    async getAdminListings() {
        return this.fetch('data/admin-listings.json');
    },

    async getAdminTickets() {
        return this.fetch('data/admin-tickets.json');
    },

    async getAdminEvidence() {
        return this.fetch('data/admin-evidence.json');
    },

    async getAdminFieldVerification() {
        return this.fetch('data/admin-field-verification.json');
    },

    async getAdminEscrow() {
        return this.fetch('data/admin-escrow.json');
    },

    async getAdminAiLogs() {
        return this.fetch('data/admin-ai-logs.json');
    },

    async getAdminAnalytics() {
        return this.fetch('data/admin-analytics.json');
    },

    async getPlatformSettings() {
        return this.fetch('data/platform-settings.json');
    },

    async getAccountVerificationStatus(userId) {
        // Return a mock state for this user from localStorage or defaults
        const uploaded = localStorage.getItem(`verified_uploaded_${userId}`) === 'true';
        const aiStatus = localStorage.getItem(`verified_ai_status_${userId}`) || 'NotUploaded';
        return {
            userId: userId,
            isUploaded: uploaded,
            aiStatus: aiStatus,
            aiStatusAr: this.getAiStatusAr(aiStatus)
        };
    },

    getAiStatusAr(status) {
        const mapping = {
            'NotUploaded': 'غير مرفوع',
            'Uploaded': 'مرفوع',
            'AiPending': 'قيد مراجعة الـ AI',
            'AiApproved': 'مقبول آلياً (AI Approved)',
            'AiWarning': 'تحذير آلي (AI Warning)',
            'AiRejected': 'مرفوض آلياً (AI Rejected)',
            'AdminApproved': 'موثق ومعتمد من الإدارة',
            'AdminRejected': 'مرفوض من الإدارة',
            'ReuploadRequired': 'إعادة الرفع مطلوبة'
        };
        return mapping[status] || status;
    },

    async submitAccountDocuments(userId, frontImg, backImg, regDoc = null) {
        localStorage.setItem(`verified_uploaded_${userId}`, 'true');
        localStorage.setItem(`verified_ai_status_${userId}`, 'AiPending');
        return { success: true, status: 'AiPending' };
    },

    async getAdminAccountVerifications() {
        return this.fetch('data/admin-account-verifications.json');
    },

    async approveAccountVerification(id) {
        window.showToast(`تمت الموافقة الميدانية وتوثيق الحساب رقم ${id} بنجاح.`);
        return { success: true };
    },

    async rejectAccountVerification(id, reason) {
        window.showToast(`تم رفض مستندات الحساب رقم ${id}. السبب: ${reason}`, 'danger');
        return { success: true };
    },

    async requestDocumentReupload(id, reason) {
        window.showToast(`تم إرسال طلب إعادة رفع المستندات للحساب رقم ${id}. السبب: ${reason}`);
        return { success: true };
    },

    async getMarketplaceListings() {
        return this.fetch('data/marketplace-listings.json');
    },

    async getServiceListings() {
        return this.fetch('data/service-listings.json');
    }
};

window.API = API;
