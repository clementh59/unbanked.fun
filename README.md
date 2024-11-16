# Unbanked

Unbanked is a next generation wallet, focused on simplicity of onboarding while actively rebalancing the liquidity every hour on the best rewarding money market.

![Unbanked Overview](./unbanked_1.png)

# Concept

![Unbanked Concept](./unbanked_2.png)

# How does it work?

When onboarding the user, we create an ERC4337 on Base for him. User is, and will always be, the only controller of the smart
contract account. Once he tops up its account with a stablecoin, we then automatically move its liquidity accros multiple
money markets (currently AAVE and IONIC are supported). Our systems actively monitor the current stablecoin lending rates to ensure the liquidity is always in the
best rewarding pools.

![How it works](./unbanked_3.png)

# To go further

- Supporting more money market (obviously).
- actively borrowing and repaying: if it's worth borrowing any asset against our collateral, and deposit it on another one,
we can actively do it, while monitoring the evolution of the rates (and, obviously, the LTV).
- hysteresys threshold: implement a better mechanism to avoid round trips between protocols, especially if we start to have a size big enough to impact protocol rates.


**The future is on-chain.**