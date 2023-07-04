# Vetty

## About the project

This project was created for my Bachelor's Thesis. Its main goal is to create an application that would enable the storage of medical data of pets. Medical data includes a history of past illnesses along with blood tests. Besides storing medical records, the implemented web application also has a built-in forum created for users to share experiences and seek help.

---

## Project description

## Application functionalities

The application allows user to:
- Register/Login
- Add a pet to the list
- Add public/private pet's medical history
- Add blood results to medical history (user can upload results image/document to automatically read the results of the blood test factors)
- Add a thread on the forum with a reference to the disease
- Filter threads
- Comment threads
- Like comments/threads
- Search for other users
- See pets' blood factors statistics


## Structure 
The application was developed using client-server architecture and consists of:
- Client Application (Frontend)
- Server Application (Backend)
- Database

![Architecture](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/architecture.png)


## Technologies

### Implementation
- Backend
  - Java 11
  - React
  - Spring (Spring Boot, Spring Data, Spring Security)
  - Maven
  - Tesseract
  - Hibernate
- Frontend
  - JavaScript
  - React
  - Bootstrap
  - Axios
- Database
  - MySQL
  
### Deployment
- TO BE DONE

---

## Launching the app

Currently, app cannot be launched based on code (properties of application not pushed to prevent passwords leaks)
Launch instructions will be added soon together with docerization of the app.

---

## Tesseract OCR usage / Reading Blood Results Process

![OCRServiceProcess](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/OCR.png)


## Application preview

### Login / SignUp 
![Login](https://github.com/wiktor-kulesza/Vetty/blob/11aa9eeb9c204bbe362f5abb87790038df4ece12/project-preview/add-pet.png)
![Register](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/registration.png)

---

### Main View
![MainPage](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/pet-list.png)

---

### Add Pet 
![AddPet](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/add-pet.png)

---

### Pet View

#### Information Tab
![PetInfo](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/pet-view.png)

---

#### Medical Histories Tab
![PetMedicalHistories](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/pet-medical-histories.png)
![PetAddMedicalHistory](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/add-results-medical-history.png)

---

#### Threads Tab
![PetThreads](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/pet-threads.png)

---

#### Statistics Tab
![PetStats](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/pet-stats.png)

---

### Forum View
![Forum](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/forum.png)
![ForumSearchCriteria](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/search-criteria.png)

---

### Thread View
![Thread](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/thread-view.png)
![Thread2](https://github.com/wiktor-kulesza/Vetty/blob/main/project-preview/thread-medical-history.png)





