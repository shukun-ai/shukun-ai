import { useTranslation } from "react-i18next";

export const Reports = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>Welcome to Reports! {t('welcome')}</h1>
    </div>
  );
};
