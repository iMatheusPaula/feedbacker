function init (apiKey) {
    async function handleLoadWidget(){
        console.log('chegou aq')
        const page = `${window.location.origin}${window.location.pathname}`;
        // const fp = await window.FingerprintJS.load();
        const fingerprint = '124123124123';

        const WIDGET_URL = `http://localhost:3000?apikey=${apiKey}${page}&fingerprint=${fingerprint}`;
        const config = { method: 'HEAD'};
        const response = await fetch (`http://localhost:8000/api/apikey/exists/${apiKey}`, config);
        if(response.status === 200) {
            const iframe = document.createElement('iframe');
            iframe.src = WIDGET_URL;
            iframe.id = 'feedbacker-iframe';
            iframe.style.position = 'fixed';
            iframe.style.bottom = '0px';
            iframe.style.right = '0px';
            iframe.style.overflow = 'hidden';
            iframe.style.border = '0px';
            iframe.style.zIndex = '99999';
            document.body.appendChild(iframe);
            window.addEventListener('message', (event) => {
                if(!event.data.isWidget) return;
                if(event.data.isOpen){
                    iframe.height = '100%';
                    iframe.width = '100%';
                } else {
                    iframe.width = '300px';
                    iframe.height = '150px';
                }
            });
            return
        }
        console.log('[feedbacker] was not loaded because apikey does not exist');
    }
    const script = document.createElement('script');
    script.src = 'http://openfpcdn.io/fingerprintjs/v4';
    script.async = 'async';
    script.addEventListener('load', handleLoadWidget);
    document.body.appendChild(script);
}
window.init = init
