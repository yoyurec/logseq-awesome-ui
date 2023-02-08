import { root, doc, globals } from '../globals/globals';

import calendarStyles from './calendar.css?inline';

let calendarButton: HTMLElement | null = null;
let agendaButton: HTMLElement | null = null;
let agendaPlugin: HTMLElement | null = null;

const setSidebarWidthVar = () => {
    const leftSidebarWidth = doc.getElementById('left-sidebar')?.getBoundingClientRect()?.width;
    root.style.setProperty('--awUI-calc-left-sidebar-width', `${leftSidebarWidth}px`);
    const rightSidebarWidth = doc.getElementById('right-sidebar')?.getBoundingClientRect()?.width;
    root.style.setProperty('--awUI-calc-right-sidebar-width', `${rightSidebarWidth}px`);
}

const hideCalendar = () => {
    agendaPlugin!.classList.remove('visible');
    calendarButton!.classList.remove('active');
}

const calendarClickHandler = () => {
    setSidebarWidthVar();
    agendaButton!.click();
    calendarButton!.classList.add('active');
}

export const toggleCalendarFeature = () => {
    if (globals.pluginConfig.featureCalendarEnabled) {
        calendarLoad();
    } else {
        calendarUnload();
    }
}

export const calendarLoad = async () => {
    if (!globals.pluginConfig.featureCalendarEnabled) {
        return;
    }
    logseq.provideStyle({ key: 'awUI-calendar-css', style: calendarStyles });
    const journalsButton = doc.querySelector('.nav-header .journals-nav');
    const calendarButtonHTML = `
        <div class="calendar-nav">
            <a href="#/page/calendar." class="item group flex items-center text-sm font-medium rounded-md" id="awUI-calendar-menu">
                <span class="ui__icon ti ls-icon-calendar-time"></span><span class="flex-1">Calendar</span>
                </a>
        </div>
    `;
    journalsButton?.insertAdjacentHTML('afterend', calendarButtonHTML);
    calendarButton = doc.getElementById('awUI-calendar-menu');
    setSidebarWidthVar();

    agendaPlugin = doc.getElementById('logseq-agenda_lsp_main') as HTMLElement;
    if (agendaPlugin) {
        console.log('AwesomeUI: agenda plugin found on init!');
    }else {
        console.log('AwesomeUI: agenda plugin not found!');
        return;
    }
    agendaButton = doc.querySelector('#injected-ui-item-logseq-plugin-agenda-logseq-agenda .button') as HTMLAnchorElement;
    if (!agendaButton) {
        logseq.UI.showMsg('AwesomeUI: "Agenda" plugin button not found on toolbar, plz pin it and restart Logseq!', 'warning', {timeout: 20000});
        return;
    }

    if (!calendarButton) {
        console.log('AwesomeUI: calendar button not found!');
        return;
    }

    calendarButton.addEventListener('click', calendarClickHandler, false);

    logseq.App.onRouteChanged(({ path }) => {
        if (path === '/page/calendar.') {
            calendarClickHandler();
        } else {
            hideCalendar();
        }
    });

    logseq.App.onSidebarVisibleChanged(() => {
        setSidebarWidthVar();
    });
}

export const calendarUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="awUI-calendar-css"]`)?.remove();
    doc.querySelector('.nav-header .calendar-nav')?.remove();
}
