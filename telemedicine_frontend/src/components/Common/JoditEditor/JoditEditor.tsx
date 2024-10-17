import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/router';
import { addConsultationNote, getConsultationNotesByPatientAndProvider, InitialStateConsultationNotes } from '@/redux/slice/consultationNotesSlice';

const Editor: React.FC = () => {
  const dispatch=useAppDispatch();
  const router = useRouter();
  const editor = useRef<any>(null);
  const [content, setContent] = useState<string>('<p>Add Consultation Notes...</p>');
  const { patientId, providerId, appointmentID } = router.query;


  const note: string = useAppSelector(
    (state: { consultationNote: InitialStateConsultationNotes }) =>
      state.consultationNote.getConsultationNote
  );

  useEffect(() => {
    //dispatch karna hai content lene ke liye
    if(patientId && providerId)
    dispatch(getConsultationNotesByPatientAndProvider({patientID:+patientId,providerID:+providerId}));
  }, [patientId, providerId]);

  useEffect(() => {
    if (note) {
      setContent(note);
    }
  }, [note]);


  const saveContent = async (newContent: string) => {
    //dispatch karna h save karne ke liye
    if(patientId && providerId)
    dispatch(addConsultationNote({patientID:+patientId,providerID:+providerId,notes:content}))
  };



  const JoditEditor = dynamic(()=>import("jodit-react"),{ssr: false})
  return (
    <div style={{width:"300px"}}>
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={(newContent: string) => {
          setContent(newContent);
          saveContent(newContent);
        }}
      />
    </div>
  );
};

export default Editor;
