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
    }
};

window.API = API;
