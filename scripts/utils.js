/**
 * Shows a custom popup message.
 * @param {string} message The message to display.
 * @param {string} type 'success', 'error', or 'info'
 */
function showPopup(message, type = 'info') {
    // Remove existing popup if any
    const existingPopup = document.getElementById('custom-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.className = `popup-${type}`;
    
    let icon = '';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';

    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-icon">${icon}</span>
            <span class="popup-message">${message}</span>
        </div>
    `;

    document.body.appendChild(popup);

    // Trigger animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    // Auto hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 3000);
}
