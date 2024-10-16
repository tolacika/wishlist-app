import { useState, useEffect } from 'react';

const useSecrets = () => {
  const [secrets, setSecrets] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedSecrets = localStorage.getItem('stored_secrets');
    if (storedSecrets) {
      setSecrets(JSON.parse(storedSecrets));
    }
  }, []);

  const getSecret = (documentId: string) => {
    return secrets[documentId];
  };

  const setSecret = (documentId: string, secret: string) => {
    const updatedSecrets = { ...secrets, [documentId]: secret };
    setSecrets(updatedSecrets);
    localStorage.setItem('stored_secrets', JSON.stringify(updatedSecrets));
  };

  const resetSecrets = () => {
    setSecrets({});
    localStorage.setItem('stored_secrets', JSON.stringify({}));
  };

  return { getSecret, setSecret, resetSecrets };
};

export default useSecrets;