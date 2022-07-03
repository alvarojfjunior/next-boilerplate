## RUNNING LOCAL AS DEV
  1. Run project and db services `docker-compose up`
  2. Run db migrations `docker exec nextjs npx prisma migrate dev --name init`
  3. Run db seeds `docker exec nextjs npx prisma db seed`

## PRODUCTION DEPLOY
  1. Run jenkins and db services `docker-compose -f docker-compose-jenkins.yml up -d`
  2. If you need the firts password `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`
  3. Install Suggested Plugins
  4. Instal and enable nodejs plugin as name `nodejs`
  5. Create a pipeline job just cloning the project
  6. Run build

```
pipeline {
    agent any
    tools { nodejs 'nodejs' }
    
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/alvarojfjunior/next-boilerplate.git'
            }
        }
        
        stage('Creating .env file') {
            steps {
                writeFile file: '.env', text: 'DATABASE_URL=postgres://postgres:changeme@postgres:5432/app'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install -f'
            }
        }
        

        stage('Creating database, running migrations and seeds') {
            steps {
                sh 'npx prisma migrate dev --name init'
                //sh 'npx prisma db seed'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Start') {
            steps {
                sh 'npm run start'
            }
        }
    }
}
```