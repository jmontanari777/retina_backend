#  Retina Diagnostic Web Application Powered by AI

This project combines the power of deep learning with a modern web architecture to create an accessible and efficient diagnostic tool for healthcare professionals.

## Purpose and Medical Context

Retinal diseases such as Diabetic Retinopathy, Age-related Macular Degeneration, and Hypertensive Retinopathy are among the leading causes of vision impairment and blindness worldwide. Early detection is critical. However, specialized diagnostic equipment and trained ophthalmologists are not always readily available, especially in low-resource settings.

Our solution aims to bridge that gap — by providing a cloud-based AI diagnostic system that can analyze fundus images and assist medical professionals in identifying possible signs of retinal pathology within seconds.

## Deep Learning Model

At the core of this application is a ResNet50 convolutional neural network — a well-established architecture originally trained on ImageNet and fine-tuned using a dataset of labeled retinal fundus images.

This model has been trained to classify images into multiple categories. For example:

Normal retina

Signs of Diabetic Retinopathy

Signs of Macular Degeneration

Other vascular anomalies

The model performs preprocessing steps like resizing and normalizing the input image, then feeds it through the ResNet layers to extract complex visual features. The final fully connected layer outputs a probability distribution over the diagnostic categories.

## Software Architecture

The application consists of three fully integrated components:

1. Frontend (User Interface)
Built with React, using Vite for bundling and TailwindCSS for styling, the frontend provides an intuitive and responsive interface. It allows users to:

Upload a retinal image

Trigger the diagnostic prediction

Instantly view the result

The frontend performs basic file validation and communicates with the backend via HTTP requests.

2. Backend (Express.js Gateway)
This layer, built with Node.js and Express, serves as the bridge between the frontend and the AI engine. It handles:

Image upload and storage using multer

File management

Communication with the Python-based model server using axios

The Express backend decouples the client and model server, improving modularity and scalability.

3. Model Server (FastAPI + PyTorch)
The AI core is powered by FastAPI and PyTorch. When an image is uploaded:

The server loads the trained ResNet50 model from a .pth file

The image is preprocessed using torchvision.transforms

A prediction is returned as a structured JSON response

This Python microservice is fast, efficient, and fully compatible with modern ML deployment standards.

## Integration Flow

The flow of the application is as follows:

1. The user uploads a fundus image via the React interface.

2. The Express backend receives the image, saves it temporarily, and forwards it to the FastAPI server.

3. The FastAPI server loads the image, processes it through the neural network, and returns the predicted condition.

4. The frontend displays the diagnosis, allowing the user to interpret or export the results.
