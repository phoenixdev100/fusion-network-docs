// Server Status Handler
class ServerStatus {
    constructor(serverIP, updateInterval = 30000) {
        this.serverIP = serverIP;
        this.updateInterval = updateInterval;
        this.statusElement = document.querySelector('.server-status');
        this.playerCountElement = this.statusElement.querySelector('span:last-child');
        this.statusIndicator = this.statusElement.querySelector('.status-indicator');
        
        // Initial fetch
        this.fetchServerStatus();
        
        // Set up periodic updates
        setInterval(() => this.fetchServerStatus(), this.updateInterval);
    }
    
    async fetchServerStatus() {
        try {
            const response = await fetch(`https://api.mcsrvstat.us/2/${this.serverIP}`);
            const data = await response.json();
            
            this.updateDisplay(data);
        } catch (error) {
            console.error('Failed to fetch server status:', error);
            this.showOfflineStatus();
        }
    }
    
    updateDisplay(data) {
        if (data.online) {
            const playerCount = data.players?.online || 0;
            const maxPlayers = data.players?.max || 0;
            
            this.statusIndicator.className = 'status-indicator status-online';
            this.playerCountElement.textContent = `Server Online - ${playerCount}/${maxPlayers} Players`;
            this.statusElement.classList.remove('status-offline');
            
            // Add tooltip with player list if available
            if (data.players?.list && data.players.list.length > 0) {
                const playerList = data.players.list.join(', ');
                this.statusElement.setAttribute('title', `Online Players: ${playerList}`);
            }
        } else {
            this.showOfflineStatus();
        }
    }
    
    showOfflineStatus() {
        this.statusIndicator.className = 'status-indicator status-offline';
        this.playerCountElement.textContent = 'Server Offline';
        this.statusElement.classList.add('status-offline');
        this.statusElement.removeAttribute('title');
    }
    
    // Method to manually trigger a status update
    refresh() {
        this.fetchServerStatus();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create server status instance
    const serverStatus = new ServerStatus('fusion-network.xyz');
    
    // Add click handler to refresh status
    document.querySelector('.server-status').addEventListener('click', () => {
        serverStatus.refresh();
    });
}); 