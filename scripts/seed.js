const { connectDB, disconnectDB } = require('../src/config/database');
const RequestType = require('../src/models/requestType');

async function seed() {
    try{
        await connectDB();

        await RequestType.deleteMany({});

        await RequestType.insertMany([
            {
                code: 'TECH_ISSUE',
                name: 'Incident',
                description: 'Problème technique de l\'application.',
                priority: 'high',
                category: 'TECHNICAL',
                estimatedResponseTime: 4,
                isActive: true,
            },
            {
                code: 'BILLING_QUESTION',
                name: 'Question de facturation',
                description: 'Question sur l\'utilisation de la facturation en général sur l\'application.',
                priority: 'low',
                category: 'SUPPORT',
                estimatedResponseTime: 24,
                isActive: true,
            },
            {
                code: 'ACCOUNT_MODIFICATION_REQUEST',
                name: 'Demande de modification de compte',
                description: 'Demande de modification de données du compte ou autre...',
                priority: 'low',
                category: 'ADMINISTRATIVE',
                estimatedResponseTime: 24,
                isActive: true,
            },
            {
                code: 'FEATURE_REQUEST',
                name: 'Demande de fonctionnalité',
                description: 'Demande de fonctionnalité lié à une problématique d\'utilisation dans l\'application.',
                priority: 'low',
                category: 'TECHNICAL',
                estimatedResponseTime: 12,
                isActive: true,
            },
            {
                code: 'COMPLAINT',
                name: 'Réclamation',
                description: 'Demande de réclamation auprès de l\'administration.',
                priority: 'medium',
                category: 'ADMINISTRATIVE',
                estimatedResponseTime: 12,
                isActive: true,
            },
        ]);
    }catch(error){
        console.error("Seed failed: ", error);
    }finally{
        await disconnectDB();
    }
}