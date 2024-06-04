export type StoreState = {
    currentComponent: string;
    feedbackType: string;
    message: string;
    apiKey: string;
    fingerprint: string;
    currentPage: string;
};
export type Feedback = {
    feedbackType: StoreState['feedbackType'];
    message: StoreState['message'];
    currentPage: StoreState['currentPage'];
    apiKey: StoreState['apiKey'];
    fingerprint: StoreState['fingerprint'],
    device: string;
}
const initialState: StoreState = {
    currentComponent: 'WizardSelectFeedbackType',
    message: '',
    feedbackType: '',
    fingerprint: '',
    apiKey: '',
    currentPage: ''
};
const state = reactive<StoreState>({ ...initialState });
export function setCurrentComponent (component: string): void {
    state.currentComponent = component;
}
export function setMessage (message: string): void {
    state.message = message;
}
export function setFeedbackType (type: string): void {
    state.feedbackType = type;
}
export function setCurrentPage (page: string): void {
    state.currentPage = page;
}
export function setApiKey (apiKey: string): void {
    state.apiKey = apiKey;
}
export function setFingerprint (fingerprint: string): void {
    state.fingerprint = fingerprint;
}
export function resetStore (): void {
    setCurrentComponent(initialState.currentComponent);
    setMessage(initialState.message);
    setFeedbackType(initialState.feedbackType);
    setCurrentPage(initialState.currentPage);
    setApiKey(initialState.apiKey);
    setFingerprint(initialState.fingerprint);
}
export async function sendFeedback(payload: { device: string }){
    await useApiFetch("/sanctum/csrf-cookie");
    const sendFeedback = await useApiFetch("/api/feedbacks", {
        method: "POST",
        body: {
            type: state.feedbackType,
            text: state.message,
            page: state.currentPage,
            api: state.apiKey,
            finger: state.fingerprint,
            ...payload
        },
    });
    return sendFeedback;
}
export default readonly(state);
