import React, { useEffect, useState } from 'react';
import styles from "./sendMessageToProvider.module.css";
import { sendMessage } from '@/redux/slice/messageSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { getProviders, InitialStateProviders } from '@/redux/slice/providersSlice';




interface Provider {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: any;
}


const SendMessageToProvider: React.FC = () => {

    const dispatch=useAppDispatch();
    const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');
  
    const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedProvider(Number(event.target.value));
    };
  
    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      if (selectedProvider !== null && message.trim()) {
        dispatch(sendMessage({id:selectedProvider,message:message}))
        setSelectedProvider(null);
        setMessage('');
      } else {
        alert('Please select a provider and enter a message.');
      }
    };

    const providers = useAppSelector((state: {providers:InitialStateProviders}) => state.providers.providers);
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch(getProviders());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className={styles.container}>
        <h2 style={{textAlign:"center"}}>Send Message</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="provider" className={styles.label}>
            Select Provider
          </label>
          <select
            id="provider"
            value={selectedProvider ?? ''}
            onChange={handleProviderChange}
            className={styles.select}
          >
            <option key={0} value="">--Select a provider--</option>
            {providers.map((provider) => (    
              <option key={provider.providerID} value={provider.user.userID}>
                {`${provider.user.firstName} ${provider.user.lastName} `}
              </option>
            ))}
          </select>

          <p>Option Selected : {selectedProvider}</p>
  
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Enter your message here..."
            className={styles.textarea}
          />
  
          <button type="submit" className={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    );
  };
  
  export default SendMessageToProvider;