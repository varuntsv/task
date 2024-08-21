# Instance Availability zone 
us-west-1c

# 1. VPC Creation
      a. created a vpc in an availability zone
      b. created 2 public and private subnets
      c. created internet gateways and nat gateway
      d. attached the gateways to public and private subnet respectively
      e. in route table we made the port open to 0.0.0 and to open to NAT gateway.

# 2. steps followed to update the docker image to ecr
      a. create a docker file
      b. build the docker image and push to ecr using below commands
      sudo docker build -t nodej:check 
      sudo docker tag finalnodej:check 533267005898.dkr.ecr.us-west-1.amazonaws.com/nodejcheck:latest
      aws ecr get-login-password --region us-west-1 | sudo docker login --username AWS --password-stdin 533267005898.dkr.ecr.us-west-1.amazonaws.com
      sudo docker push 533267005898.dkr.ecr.us-west-1.amazonaws.com/nodejcheck:latest
   
  # 3. Create a EKS cluster with the group-nodes sitting only in the private subnet.
      a. Create a VPC with private and public subnets
      b. Install eksctl
      c. Create an EKS cluster in the specified VPC and private subnets
      d. replace withn subnets with private subnets
      e. nodes will b launched in private subnet. 
 
  # 4. to Create a target group association with the EKS cluster and configure an ALB
      a. create an ALB in AWS
      b. expose the https link the listener group
      c. expose the port of the cluster in target group
      d. whitelist the same group in security group of cluster
      c. whitelist the required port in the jumppost created to maintain the cluster in AWS
      d. expose https in localhost 8080
      e. service will be enabled.
