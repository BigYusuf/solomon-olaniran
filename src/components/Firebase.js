import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
  setDoc,
  onSnapshot
} from "firebase/firestore";

const projectCollectionRef = collection(db, "project");
const articleCollectionRef = collection(db, "article");
const skillCollectionRef = collection(db, "skill");
const eduCollectionRef = collection(db, "education");
const expCollectionRef = collection(db, "experience");

  /*-------------------------- Projects -----------------------------------------*/
  export const AddProject = (newProject) => {
    return addDoc(projectCollectionRef, newProject);
  };

  export const UpdateProject = (id, updatedProject) => {
    const projectDoc = doc(db, "project", id);
    return updateDoc(projectDoc, updatedProject);
  };
  export const GetAllProjectRealtime = () => {
    onSnapshot(projectCollectionRef, (snapshot) => {
     let data = []
     snapshot.docs.forEach((doc) => { data.push({...doc.data(), id: doc.id})})
      return data
    });
 };
  export const DeleteProject = (id) => {
    const projectDoc = doc(db, "project", id);
    return deleteDoc(projectDoc);
  };
  export const GetAllProjects = () => {
    return getDocs(projectCollectionRef, orderBy('createdAt'));
  };
  export const GetAllactiveProjects = () => {
    const q = query(projectCollectionRef, where("status", "==", "active"));
    return getDocs(q);
  };
  export const GetProjectsByCategory = (category) => {
    return getDocs(query(projectCollectionRef, where("category","==", category), orderBy('createdAt')));
  };
  export const GetProject = (id) => {
    const projectDoc = doc(db, "project", id);
    return getDoc(projectDoc);
  };
  
  /*-------------------------- articles -----------------------------------------*/
  export const AddArticle = (newArticle) => {
    return addDoc(articleCollectionRef, newArticle);
  };

  export const UpdateArticle = (id, updatedArticle) => {
    const articleDoc = doc(db, "article", id);
    return updateDoc(articleDoc, updatedArticle);
  };

  export const DeleteArticle = (id) => {
    const articleDoc = doc(db, "article", id);
    return deleteDoc(articleDoc);
  };
  export const GetAllArticles = () => {
    return getDocs(articleCollectionRef, orderBy('createdAt'));
  };
  export const GetArticlesByCategory = (category) => {
    return getDocs(query(articleCollectionRef, where("cat","==", category), orderBy('createdAt')));
  };
  export const GetArticle = (id) => {
    const articleDoc = doc(db, "article", id);
    return getDoc(articleDoc);
  };
  
  /*-------------------------- Folio Home -----------------------------------------*/
  export const SetFolioHome = (updatedFolioHome) => {
    const folioDoc = doc(db, "portfolio",  "Home");
    return setDoc(folioDoc, updatedFolioHome);
  };
  export const UpdateFolioHome = (updatedFolioHome) => {
    const folioDoc = doc(db, "portfolio",  "Home");
    return updateDoc(folioDoc, updatedFolioHome);
  };
  export const GetFolioHome = () => {
    const folioDoc = doc(db, "portfolio", "Home");
    return getDoc(folioDoc);
  };
  /*-------------------------- Folio About -----------------------------------------*/
  export const SetFolioAbout = (updatedFolioAbout) => {
    const folioDoc = doc(db, "portfolio",  "About");
    return setDoc(folioDoc, updatedFolioAbout);
  };
  export const UpdateFolioAbout = (updatedFolioAbout) => {
    const folioDoc = doc(db, "portfolio",  "About");
    return updateDoc(folioDoc, updatedFolioAbout);
  };
  export const GetFolioAbout = () => {
    const folioDoc = doc(db, "portfolio", "About");
    return getDoc(folioDoc);
  };

  /*-------------------------- Skills -----------------------------------------*/
  export const AddSkill = (newSkill) => {
    return addDoc(skillCollectionRef, newSkill);
  };
  export const DeleteSkill = (id) => {
    const skillDoc = doc(db, "skill", id);
    return deleteDoc(skillDoc);
  };
  export const GetAllSkills = () => {
    return getDocs(skillCollectionRef, orderBy('createdAt'));
  };
  export const GetAllactiveSkills = () => {
    const q = query(skillCollectionRef, where("status", "==", "active"));
    return getDocs(q, orderBy('createdAt'));
  };
  export const GetSkillsByCategory = (category) => {
    return getDocs(query(skillCollectionRef, where("cat","==", category), orderBy('createdAt')));
  };
  export const UpdateSkills = (id, updatedSkills) => {
    const skillDoc = doc(db, "skill",  id);
    return updateDoc(skillDoc, updatedSkills);
  };
  export const GetSkills = (id) => {
    const skillDoc = doc(db, "skill", id);
    return getDoc(skillDoc);
  };

  /*-------------------------- Experience -----------------------------------------*/
  export const AddExperience = (newExperience) => {
    return addDoc(expCollectionRef, newExperience);
  };
  export const DeleteExperience = (id) => {
    const expDoc = doc(db, "experience", id);
    return deleteDoc(expDoc);
  };
  export const GetAllExperiences = () => {
    return getDocs(expCollectionRef, orderBy('createdAt'));
  };
  export const GetAllactiveExperiences = () => {
    const q = query(expCollectionRef, where("status", "==", "active"));
    return getDocs(q);
  };
  export const GetExperiencesByCategory = (category) => {
    return getDocs(query(expCollectionRef, where("cat","==", category), orderBy('createdAt')));
  };
  export const UpdateExperience = (id, updatedExperience) => {
    const expDoc = doc(db, "experience",  id);
    return updateDoc(expDoc, updatedExperience);
  };
  export const GetExperience = (id) => {
    const expDoc = doc(db, "experience", id);
    return getDoc(expDoc);
  };

  /*-------------------------- Educations -----------------------------------------*/
  export const AddEducation = (newEducation) => {
    return addDoc(eduCollectionRef, newEducation);
  };
  export const DeleteEducation = (id) => {
    const eduDoc = doc(db, "education", id);
    return deleteDoc(eduDoc);
  };
  export const GetAllEducations = () => {
    return getDocs(eduCollectionRef, orderBy('createdAt'));
  };
  export const GetAllactiveEducations = () => {
    const q = query(eduCollectionRef, where("status", "==", "active"));
    return getDocs(q, orderBy('createdAt'));
  };
  export const GetEducationsByCategory = (category) => {
    return getDocs(query(eduCollectionRef, where("cat","==", category), orderBy('createdAt')));
  };
  export const UpdateEducation = (id, updatedEducation) => {
    const eduDoc = doc(db, "education",  id);
    return updateDoc(eduDoc, updatedEducation);
  };
  export const GetEducation = (id) => {
    const eduDoc = doc(db, "education", id);
    return getDoc(eduDoc);
  };
