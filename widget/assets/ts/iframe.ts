import { setApiKey, setCurrentPage, setFingerprint } from "~/stores/useWidgetStore";
interface IframeControl {
    updateCoreValuesOnStore(): void;
    notifyClose(): void;
    notifyOpen(): void;
};
export default function useIframeControl(): IframeControl {
    function updateCoreValuesOnStore(): void{
        if (process.env.NODE_ENV === 'production') {
            const query = new URLSearchParams(window.location.search);
            const apiKey = query.get('api_key') ?? '';
            const page = query.get('page') ?? '';
            const fingerprint = query.get('fingerprint') ?? '';
            setApiKey(apiKey);
            setCurrentPage(page);
            setFingerprint(fingerprint);
        }
        setApiKey('Q3eeKLymtwZAqvmknIgUBXBmzNhXBH3x8MIGRQdwlXyZ4kRFo0lzIasw66Ng');
        setCurrentPage('https://test-feeedbacker.dev/');
        setFingerprint('123451112412553456');
    }
    function notifyClose(): void{
        window.parent.postMessage({
            isWidget: true,
            isOpen: false,
        }, '*');
    }
    function notifyOpen(): void {
        window.parent.postMessage({
            isWidget: true,
            isOpen: true,
        }, '*');
    }
    return { updateCoreValuesOnStore, notifyClose, notifyOpen }
};
