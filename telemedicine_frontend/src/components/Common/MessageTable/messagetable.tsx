import React from 'react';
import styles from './messagetable.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const MessageTable = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state: any) => state.message.message);

  return (
    <div className={styles.message_table_container}>
      <h1 className={styles.message_table_header}>Messages</h1>
      <div className={styles.table_wrapper}>
        <table className={styles.message_table}>
          <thead>
            <tr className={styles.message_table_header_row}>
              <th className={styles.message_table_header_cell}>Sno</th>
              <th className={styles.message_table_header_cell}>Message</th>
              <th className={styles.message_table_header_cell}>Sender Name</th>
              <th className={styles.message_table_header_cell}>Received At</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message: any, index: number) => (
              <tr key={index} className={styles.message_table_row}>
                <td className={styles.message_table_cell}>{index + 1}</td>
                <td className={styles.message_table_cell}>{message.messageContent}</td>
                <td className={styles.message_table_cell}>
                  {message.sender.firstName + ' ' + message.sender.lastName}
                </td>
                <td className={styles.message_table_cell}>
                  {message.sentAt.substring(11, 16)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageTable;
