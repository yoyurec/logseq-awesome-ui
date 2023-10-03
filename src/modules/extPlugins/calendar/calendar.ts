import { root, doc, globals } from '../../globals/globals';

import calendarStyles from './calendar.css?inline';

let sidebarCalendarButton: HTMLElement | null = null;
let agendaPlugin: HTMLElement | null = null;

const calendarPagePath = '/page/calendar'

export const menuCalendarToggle = () => {
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
                <span class="ui__icon ti ls-icon-calendar-time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M11 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3.5M16 3v4M8 3v4M4 11h11"></path><path d="M17.8 20.8 15.6 22a.4.4 0 0 1-.5-.5l.4-2.4-1.8-1.7a.4.4 0 0 1 .2-.6l2.5-.4 1-2.2a.4.4 0 0 1 .8 0l1 2.2 2.5.4a.4.4 0 0 1 .2.6L20 19.1l.4 2.4a.4.4 0 0 1-.5.5l-2.2-1.2z"></path></svg>
                </span>
                <span class="flex-1">Calendar</span>
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
