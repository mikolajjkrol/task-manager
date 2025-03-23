echo 'Building app'
npm run build

echo 'Deploying files to server'
scp -r dist/* m@192.168.33.11:/var/www/react/task-manager/
echo 'Done!'