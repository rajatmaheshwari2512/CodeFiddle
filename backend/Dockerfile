FROM ubuntu
RUN useradd -ms /bin/bash rajat
WORKDIR /home/rajat/
RUN apt update && apt upgrade -y
RUN apt install curl nano -y
RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt install -y nodejs
RUN echo "PS1='\w '">>/home/rajat/.bashrc
WORKDIR /home/rajat/code