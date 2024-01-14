import { Menu, Button } from '@mantine/core';
import { IconWorld } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export type LanguageSwitchProps = {
  //
};

export const LanguageSwitch = () => {
  const { t } = useTranslation();

  const [language, setLanguage] = useState<string>(i18next.language);

  const onSwitch = useCallback((language: string) => {
    window.localStorage.setItem('i18nextLng', language);
    i18next.changeLanguage(language);
  }, []);

  useEffect(() => {
    i18next.on('languageChanged', (language) => {
      setLanguage(language);
    });
  }, []);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="subtle"
          size="xs"
          leftIcon={<IconWorld size="1rem" />}
          style={{ textTransform: 'uppercase' }}
        >
          {language}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t('sharedUi.languageSwitch.tip')}</Menu.Label>
        <Menu.Divider />
        <Menu.Item onClick={() => onSwitch('en')}>English</Menu.Item>
        <Menu.Item onClick={() => onSwitch('zh')}>简体中文</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
