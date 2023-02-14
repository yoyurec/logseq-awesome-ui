import { root, doc, globals } from '../../globals/globals';

import calendarStyles from './calendar.css?inline';

let sidebarCalendarButton: HTMLElement | null = null;
let agendaPlugin: HTMLElement | null = null;

const setSidebarWidthVar = () => {
    const leftSidebarWidth = doc.getElementById('left-sidebar')?.getBoundingClientRect()?.width;
    root.style.setProperty('--awUI-calc-left-sidebar-width', `${leftSidebarWidth}px`);
    const rightSidebarWidth = doc.getElementById('right-sidebar')?.getBoundingClientRect()?.width;
    root.style.setProperty('--awUI-calc-right-sidebar-width', `${rightSidebarWidth}px`);
}

const showCalendar = () => {
    if (agendaPlugin && sidebarCalendarButton) {
        logseq.App.invokeExternalPlugin('logseq-agenda.models.show');
        sidebarCalendarButton.classList.add('active');
        setTimeout(() => {
            doc.getElementById('logseq-agenda_iframe')?.blur();
        }, 150);
    }
}

const hideCalendar = () => {
    logseq.App.invokeExternalPlugin('logseq-agenda.models.hide');
    sidebarCalendarButton?.classList.remove('active');
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
    if (window.parent.location.hash === '#/page/calendar.') {
        setTimeout(() => {
            showCalendar();
        }, 1000);
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
    sidebarCalendarButton = doc.getElementById('awUI-calendar-menu');
    setSidebarWidthVar();

    agendaPlugin = doc.getElementById('logseq-agenda_lsp_main') as HTMLElement;
    if (agendaPlugin) {
        console.log('AwesomeUI: agenda plugin found on init!');
    }else {
        console.log('AwesomeUI: agenda plugin not found!');
        return;
    }

    if (!sidebarCalendarButton) {
        console.log('AwesomeUI: calendar button not found!');
        return;
    }

    logseq.App.onRouteChanged(({ path }) => {
        if (path === '/page/calendar.') {
            showCalendar();
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
