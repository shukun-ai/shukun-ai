import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type AskTemplate = {
  question: string;
};

export const useAskTemplates = () => {
  const { t } = useTranslation();

  const askTemplates = useMemo<AskTemplate[]>(
    () => [
      {
        question: t('conversation.question1'),
      },
      {
        question: t('conversation.question2'),
      },
      {
        question: t('conversation.question3'),
      },
      {
        question: t('conversation.question4'),
      },
      {
        question: t('conversation.question5'),
      },
    ],
    [t]
  );

  return askTemplates;
};
