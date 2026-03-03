const urls = [
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528696892704-5e1122852276?q=80&w=2500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2500&auto=format&fit=crop'
];

async function check() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${res.status} - ${url}`);
    } catch (e) {
      console.log(`ERR - ${url}`);
    }
  }
}
check();
