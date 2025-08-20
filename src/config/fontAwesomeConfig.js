import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from '@fortawesome/free-solid-svg-icons';

// Adicionar todos os ícones à biblioteca
for (let i in icons) {
    let icon = icons[i];
    if (icon.icon) {
        library.add(icon);
    }
}
