import {useContext} from 'react';

import {I18nContext} from './i18n-react';

export const useTranslation = () => useContext(I18nContext);
