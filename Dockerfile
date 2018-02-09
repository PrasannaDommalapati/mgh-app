FROM node:latest

RUN groupadd -g 117 jenkins
RUN useradd  -m -u 108 -g jenkins jenkins

RUN id -u jenkins
RUN id -g jenkins

USER jenkins
