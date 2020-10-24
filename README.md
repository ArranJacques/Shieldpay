# Shieldpay

## Local Setup

1. `npm install`
2. Create a copy of `env.example` called `.env`. Define local environment variables in this file.
3. Start development server `npm run dev`. Available at `http://localhost:3003`.

## Run Tests

```bash
npm run test
```

## Call Api

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"phoneNumber": "+447xxxxxxxxxx", "message": "test message sent from curl"}' \
    http://localhost:3003/sms
```
