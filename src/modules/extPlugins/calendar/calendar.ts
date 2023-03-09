import { root, doc, globals } from '../../globals/globals';

import calendarStyles from './calendar.css?inline';

let sidebarCalendarButton: HTMLElement | null = null;
let agendaPlugin: HTMLElement | null = null;

const calendarPagePath = '/page/calendar'

export const toggleMenuCalendar = () => {
    if (globals.pluginConfig.menuCalendar) {
        menuCalendarLoad();
    } else {
        menuCalendarUnload();
    }
}

export const menuCalendarLoad = () => {
    addCalendarButtonToSidebar();
    logseq.provideStyle({ key: '--awUi-calendar-css', style: calendarStyles });
    // show on 1st load
    if (window.parent.location.hash.toLowerCase() === `#${calendarPagePath}`) {
        setTimeout(() => {
            showAgendaPlugin();
        }, 1000);
    }

    agendaPlugin = doc.getElementById('logseq-agenda_lsp_main') as HTMLElement;
    if (!agendaPlugin) {
        console.log('AwesomeUi: agenda plugin not found!');
        return;
    }

    sidebarCalendarButton = doc.getElementById('--awUi-calendar-menu');
    const leftSidebartoggleBtn = doc.getElementById('left-menu');
    leftSidebartoggleBtn!.addEventListener('click', setSidebarWidthVar);
    logseq.App.onRouteChanged(({ path }) => {
        if (globals.pluginConfig.menuCalendar) {
            if (path.toLowerCase() === calendarPagePath) {
                showAgendaPlugin();
            } else {
                hideAgendaPlugin();
            }
        }
    });

    logseq.App.onSidebarVisibleChanged(() => {
        setSidebarWidthVar();
    });
}

export const menuCalendarUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="--awUi-calendar-css"]`)?.remove();
    doc.querySelector('.nav-header .calendar-nav')?.remove();
}


const showAgendaPlugin = async () => {
    setSidebarWidthVar();
    if (agendaPlugin && sidebarCalendarButton) {
        await logseq.App.invokeExternalPlugin('logseq-agenda.models.show');
        sidebarCalendarButton.classList.add('active');
        setTimeout(() => {
            doc.getElementById('logseq-agenda_iframe')?.blur();
        }, 150);
    }
}

const hideAgendaPlugin = () => {
    logseq.App.invokeExternalPlugin('logseq-agenda.models.hide');
    sidebarCalendarButton?.classList.remove('active');
}

const addCalendarButtonToSidebar = () => {
    const journalsButton = doc.querySelector('.nav-header .journals-nav');
    const calendarButtonHTML = `
        <div class="calendar-nav">
            <a href="#${calendarPagePath}" class="item group flex items-center text-sm font-medium rounded-md" id="--awUi-calendar-menu">
                <span class="ui__icon ti ls-icon-calendar-time"></span><span class="flex-1">Calendar</span>
                </a>
        </div>
    `;
    journalsButton?.insertAdjacentHTML('afterend', calendarButtonHTML);
}

const setSidebarWidthVar = () => {
    setTimeout(() => {
        let leftSidebarWidth;
        if (doc.getElementById('left-sidebar')?.classList.contains('is-open')) {
            leftSidebarWidth = doc.getElementById('left-sidebar')?.getBoundingClientRect()?.width;
        } else {
            leftSidebarWidth = 0;
        }
        root.style.setProperty('--awUi-calc-left-sidebar-width', `${leftSidebarWidth}px`);
        const rightSidebarWidth = doc.getElementById('right-sidebar')?.getBoundingClientRect()?.width;
        root.style.setProperty('--awUi-calc-right-sidebar-width', `${rightSidebarWidth}px`);
    }, 500);
}
