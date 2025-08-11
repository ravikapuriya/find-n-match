export type Card = number[];

export function generateDeck(n: number): Card[] {
    if (!isPrime(n)) {
        throw new Error("Order n must be prime (e.g., 2,3,5,7).");
    }
    return canonicalDeck(n);
}

function canonicalDeck(n: number): Card[] {
    const cards: Card[] = [];

    for (let a = 0; a < n; a++) {
        for (let b = 0; b < n; b++) {
            const card: number[] = [];
            for (let k = 0; k < n; k++) {
                card.push(n * k + ((a * k + b) % n));
            }
            card.push(n * n + a);
            cards.push(card);
        }
    }

    for (let b = 0; b < n; b++) {
        const card: number[] = [];
        for (let k = 0; k < n; k++) {
            card.push(n * k + b);
        }
        card.push(n * n + n);
        cards.push(card);
    }

    const last: number[] = [];
    for (let a = 0; a <= n; a++) {
        last.push(n * n + a);
    }
    cards.push(last);

    return cards;
}

function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

export function validateDeck(cards: Card[]): boolean {
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            const a = new Set(cards[i]);
            let inter = 0;
            for (const s of cards[j]) {
                if (a.has(s)) inter++;
            }
            if (inter !== 1) return false;
        }
    }
    return true;
}
