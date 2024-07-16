import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { useremail: email, userpassword: password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                    password,
                },
            });
            console.log("user found while login is: ", user);
            
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error login user' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}