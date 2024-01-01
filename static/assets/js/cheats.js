import PolarisError from './error.js';
import effects from './effects.js';

const load = () => fetch('/assets/JSON/cheats.json')
    .then(res => res.json())
    .then(cheats => cheats.forEach(cheat => {
        const el = document.createElement('div');
        el.classList = 'game';
        el.innerHTML = `<img src='${cheat.image}'><h3>${cheat.name}</h3>`;
        document.querySelector('.cheats').appendChild(el);

        effects.hoverTilt({
            max: 8,
            perspective: 1000,
            scale: 1.05,
            speed: 800,
            easing: 'cubic-bezier(.03,.98,.52,.99)'
        }, el);

        el.addEventListener('click', () => {
            localStorage.setItem('frameData', JSON.stringify({
                type: 'cheat',
                cheat
            }));
            location.href = '/view';
        });
    })).catch(e => new PolarisError('Failed to load cheats.'));

export default {
    load
};