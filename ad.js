<script>
    // Your IPinfo token
    const ipInfoToken = "d395844d1f63d2";
    const adSkipUrl = "https://modijiurl.com/api?api=f3447f011c8864f5f8ba5e96154d1a3622b266dd&url=https://nkhubz.blogspot.com";
    const adSkipTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const adSkipInstructionPage = "https://nkhubz.blogspot.com/p/ad-skip.html"; // Your ad-skip page URL

    // Fetch user's IP using IPinfo
    async function getUserIP() {
        try {
            let response = await fetch(`https://ipinfo.io?token=${ipInfoToken}`);
            let data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP:', error);
            return null;
        }
    }

    // Function to check if the user has already visited
    function hasVisitedBefore(ip) {
        let storedIP = localStorage.getItem('userIP');
        let storedTime = localStorage.getItem('visitTime');

        if (storedIP === ip) {
            let currentTime = new Date().getTime();
            // Check if the stored time is within the allowed timeframe (24 hours)
            if (currentTime - storedTime < adSkipTime) {
                return true;
            }
        }
        return false;
    }

    // Function to store IP and time after skipping the ad
    function storeVisitData(ip) {
        let currentTime = new Date().getTime();
        localStorage.setItem('userIP', ip);
        localStorage.setItem('visitTime', currentTime);
    }

    // Function to handle ad skip and redirect to content
    function handleAdSkip() {
        let randomChar = generateRandomString(10);
        window.open(`${adSkipUrl}/?s=${randomChar}`, '_self');
    }

    // Function to generate a random string
    function generateRandomString(length) {
        let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
    }

    // Main function to control access to posts
    async function controlPostAccess() {
        let userIP = await getUserIP();
        if (userIP) {
            if (hasVisitedBefore(userIP)) {
                // User has passed the ad within 24 hours, allow access
                console.log('Access granted without ad');
            } else {
                // User needs to view the ad-skip instructions
                window.location.href = adSkipInstructionPage;
            }
        } else {
            console.error('Could not get user IP');
        }
    }

    // Run the controlPostAccess function on page load
    window.onload = controlPostAccess;
</script>
