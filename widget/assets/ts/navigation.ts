import useStore from './store';
import {setCurrentComponent, setFeedbackType} from '~/stores/useWidgetStore';
export interface Navigation {
 next(): void;
 back(): void;
 setErrorState(): void;
 setSucessState(): void;
}
export default function useNavigation(): Navigation{
    const store = useStore();
    function next(): void {
        if(store.currentComponent === 'WizardSelectFeedbackType'){
            setCurrentComponent('WizardWriteAFeedback');
        }
    }
    function back(): void{
        if(store.currentComponent === 'WizardWriteAFeedback'){
            setCurrentComponent('WizardSelectFeedbackType');
            setFeedbackType('');
        }
    }
    function setErrorState(): void{
        setCurrentComponent('WizardError');
    }
    function setSucessState(): void{
        setCurrentComponent('WizardSucess');
    }
    return { next, back, setErrorState, setSucessState }
};
