import React, { useState } from 'react';
import { Project } from '../../../model/project.model';
import { Link } from 'react-router-dom';
import './projectDetail.css';
import { updateProject } from '../../../api/project.api';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const [editing, setEditing] = useState(false);
  const [editedFreeText, setEditedFreeText] = useState(project.freeText || "");
  const [editedUrlFigma, setEditedUrlFigma] = useState(project.urlFigma);
  const [editedUrlWordpress, setEditedUrlWordpress] = useState(project.urlWordpress);
  const [editedUrlDrive, setEditedUrlDrive] = useState(project.urlDrive);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('העתקה נכשלה. אנא העתק באופן ידני');
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedFreeText(project.freeText);
    setEditedUrlFigma(project.urlFigma);
    setEditedUrlWordpress(project.urlWordpress);
    setEditedUrlDrive(project.urlDrive);
    setEditing(false);
  };

  const handleSaveEdit = async () => {
    project.freeText = editedFreeText;
    project.urlFigma = editedUrlFigma;
    project.urlWordpress = editedUrlWordpress;
    project.urlDrive = editedUrlDrive;
    console.log(project);
    await updateProject(project);
    console.log('שומר את העריכה:', editedFreeText, editedUrlFigma, editedUrlWordpress, editedUrlDrive);
    setEditing(false);
  };

  return (
    <div className='project-details'>
      <div className='styleSection'>
        <div id="descrption" className='section'>
          <h2>תאור הפרויקט</h2>
          <div>
            <p>סוג הפרויקט: {project.status.value}</p>
          </div>
        </div>
        <div className='section' id="detail">
          <h2>פרטי גישה</h2>
          <div>
            <p>
              פיגמה: {editing ? (
                <input
                  className='editInput'
                  type='text'
                  value={editedUrlFigma}
                  onChange={(e) => setEditedUrlFigma(e.target.value)}
                />
              ) : (

                <Link to={project.urlFigma}>figma</Link>

              )}
              <button onClick={() => copyToClipboard(editedUrlFigma)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.1533 9.55713V2.57813C11.1533 1.75113 10.4803 1.07812 9.65332 1.07812H2.67432C1.84732 1.07812 1.17432 1.75113 1.17432 2.57813V9.55713C1.17432 10.3841 1.84732 11.0571 2.67432 11.0571H9.65332C10.4803 11.0571 11.1533 10.3841 11.1533 9.55713ZM2.17432 9.55713V2.57813C2.17432 2.30246 2.39865 2.07813 2.67432 2.07813H9.65332C9.92898 2.07813 10.1533 2.30246 10.1533 2.57813V9.55713C10.1533 9.83279 9.92898 10.0571 9.65332 10.0571H2.67432C2.39865 10.0571 2.17432 9.83279 2.17432 9.55713ZM13.3257 4.94246H12.1103C11.8343 4.94246 11.6103 5.16613 11.6103 5.44246C11.6103 5.71879 11.8343 5.94246 12.1103 5.94246H13.3257C13.6013 5.94246 13.8257 6.16679 13.8257 6.44246V13.4215C13.8257 13.6971 13.6013 13.9215 13.3257 13.9215H6.34698C6.07132 13.9215 5.84698 13.6971 5.84698 13.4215V12.0391C5.84698 11.7631 5.62332 11.5391 5.34698 11.5391C5.07065 11.5391 4.84698 11.7631 4.84698 12.0391V13.4215C4.84698 14.2485 5.51998 14.9215 6.34698 14.9215H13.3257C14.1527 14.9215 14.8257 14.2485 14.8257 13.4215V6.44246C14.8257 5.61546 14.1527 4.94246 13.3257 4.94246Z" fill="#002046" />
                </svg>
              </button>
            </p>
            <p>
              ניהול אתר: {editing ? (
                <input
                  className='editInput'
                  type='text'
                  value={editedUrlWordpress}
                  onChange={(e) => setEditedUrlWordpress(e.target.value)}
                />
              ) : (

                <Link to={project.urlWordpress}>wordpress</Link>
              )}
              <button onClick={() => copyToClipboard(editedUrlWordpress)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.1533 9.55713V2.57813C11.1533 1.75113 10.4803 1.07812 9.65332 1.07812H2.67432C1.84732 1.07812 1.17432 1.75113 1.17432 2.57813V9.55713C1.17432 10.3841 1.84732 11.0571 2.67432 11.0571H9.65332C10.4803 11.0571 11.1533 10.3841 11.1533 9.55713ZM2.17432 9.55713V2.57813C2.17432 2.30246 2.39865 2.07813 2.67432 2.07813H9.65332C9.92898 2.07813 10.1533 2.30246 10.1533 2.57813V9.55713C10.1533 9.83279 9.92898 10.0571 9.65332 10.0571H2.67432C2.39865 10.0571 2.17432 9.83279 2.17432 9.55713ZM13.3257 4.94246H12.1103C11.8343 4.94246 11.6103 5.16613 11.6103 5.44246C11.6103 5.71879 11.8343 5.94246 12.1103 5.94246H13.3257C13.6013 5.94246 13.8257 6.16679 13.8257 6.44246V13.4215C13.8257 13.6971 13.6013 13.9215 13.3257 13.9215H6.34698C6.07132 13.9215 5.84698 13.6971 5.84698 13.4215V12.0391C5.84698 11.7631 5.62332 11.5391 5.34698 11.5391C5.07065 11.5391 4.84698 11.7631 4.84698 12.0391V13.4215C4.84698 14.2485 5.51998 14.9215 6.34698 14.9215H13.3257C14.1527 14.9215 14.8257 14.2485 14.8257 13.4215V6.44246C14.8257 5.61546 14.1527 4.94246 13.3257 4.94246Z" fill="#002046" />
                </svg>
              </button>
            </p>
            <p>
              דרייב: {editing ? (
                <input
                  className='editInput'
                  type='text'
                  value={editedUrlDrive}
                  onChange={(e) => setEditedUrlDrive(e.target.value)}
                />
              ) : (
                <Link to={project.urlDrive}>drive</Link>
              )}
              <button onClick={() => copyToClipboard(editedUrlDrive)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.1533 9.55713V2.57813C11.1533 1.75113 10.4803 1.07812 9.65332 1.07812H2.67432C1.84732 1.07812 1.17432 1.75113 1.17432 2.57813V9.55713C1.17432 10.3841 1.84732 11.0571 2.67432 11.0571H9.65332C10.4803 11.0571 11.1533 10.3841 11.1533 9.55713ZM2.17432 9.55713V2.57813C2.17432 2.30246 2.39865 2.07813 2.67432 2.07813H9.65332C9.92898 2.07813 10.1533 2.30246 10.1533 2.57813V9.55713C10.1533 9.83279 9.92898 10.0571 9.65332 10.0571H2.67432C2.39865 10.0571 2.17432 9.83279 2.17432 9.55713ZM13.3257 4.94246H12.1103C11.8343 4.94246 11.6103 5.16613 11.6103 5.44246C11.6103 5.71879 11.8343 5.94246 12.1103 5.94246H13.3257C13.6013 5.94246 13.8257 6.16679 13.8257 6.44246V13.4215C13.8257 13.6971 13.6013 13.9215 13.3257 13.9215H6.34698C6.07132 13.9215 5.84698 13.6971 5.84698 13.4215V12.0391C5.84698 11.7631 5.62332 11.5391 5.34698 11.5391C5.07065 11.5391 4.84698 11.7631 4.84698 12.0391V13.4215C4.84698 14.2485 5.51998 14.9215 6.34698 14.9215H13.3257C14.1527 14.9215 14.8257 14.2485 14.8257 13.4215V6.44246C14.8257 5.61546 14.1527 4.94246 13.3257 4.94246Z" fill="#002046" />
                </svg>
              </button>
            </p>
          </div>
        </div>
        <div className='section'>
          <h2>הערות</h2>
          {editing ? (
            <textarea
              className='editInput'
              value={editedFreeText || ""}
              onChange={(e) => setEditedFreeText(e.target.value)}
            />
          ) : (
            <div>{project.freeText}</div>
          )}
        </div>
        {editing ? (
          <div>
            <button className='saveButton' onClick={handleSaveEdit}>שמור</button>
            <button className='cancelButton' onClick={handleCancelEdit}>בטל</button>
          </div>
        ) : (
          <button className='editButton' onClick={handleEdit}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8119 0.629021C11.9731 -0.209674 10.6132 -0.209674 9.77446 0.629021L1.25963 9.1431C1.20127 9.20145 1.15914 9.27378 1.13714 9.35319L0.0174161 13.3953C-0.0286332 13.561 0.0181618 13.7385 0.139717 13.8602C0.261459 13.9818 0.438944 14.0286 0.604685 13.9827L4.64714 12.8629C4.72656 12.8409 4.7989 12.7988 4.85725 12.7404L13.3719 4.22614C14.2094 3.38689 14.2094 2.02827 13.3719 1.18902L12.8119 0.629021ZM2.29956 9.4533L9.26829 2.485L11.5158 4.73227L4.54684 11.7006L2.29956 9.4533ZM1.85063 10.3541L3.64618 12.1496L1.1625 12.8377L1.85063 10.3541ZM12.697 3.55131L12.1908 4.05743L9.94319 1.80998L10.4495 1.30385C10.9154 0.837995 11.6709 0.837995 12.1368 1.30385L12.697 1.86385C13.1622 2.33027 13.1622 3.08508 12.697 3.55131Z" fill="#002046" />
          </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
