import globalContext from '../globals';
import { root, doc } from '../internal';

import calendarStyles from './calendar.css?inline';

const setSidebarWidthVar = () => {
    const rightSidebarWidth = doc.getElementById('right-sidebar')?.getBoundingClientRect()?.width;
    root.style.setProperty('--awUI-calc-right-sidebar-width', `${rightSidebarWidth}px`);
}

export const toggleCalendarFeature = () => {
    if (globalContext.pluginConfig.featureCalendarEnabled) {
        calendarLoad();
    } else {
        calendarUnload();
    }
}

export const calendarLoad = async (agendaPlugin?: HTMLElement) => {
    if (!globalContext.pluginConfig.featureCalendarEnabled) {
        return;
    }
    logseq.provideStyle({ key: 'awUI-calendar-css', style: calendarStyles });
    const journalsButton = doc.querySelector('.nav-header .journals-nav');
    const calendarButtonHTML = `
        <div class="calendar-nav">
            <a href="#/page/Calendar" class="item group flex items-center text-sm font-medium rounded-md" id="awUI-calendar-menu">
                <span class="ui__icon ti ls-icon-calendar-time"></span><span class="flex-1">Calendar</span>
                </a>
        </div>
    `;
    journalsButton?.insertAdjacentHTML('afterend', calendarButtonHTML);
    const calendarButton = doc.getElementById('awUI-calendar-menu');
    setSidebarWidthVar();

    if (!agendaPlugin) {
        agendaPlugin = doc.getElementById('logseq-agenda_lsp_main') as HTMLElement;
        if (agendaPlugin) {
            console.log('AwesomeUI: agenda plugin found on init!');
        }
    }
    if (!agendaPlugin) {
        console.log('AwesomeUI: agenda plugin not found!');
        return;
    }
    const agendaButton = doc.querySelector('#injected-ui-item-logseq-plugin-agenda-logseq-agenda .button') as HTMLAnchorElement;
    if (!agendaButton) {
        logseq.UI.showMsg('AwesomeUI: "Agenda" plugin button not found on toolbar, plz pin it and restart Logseq!', 'warning', {timeout: 20000});
        return;
    }

    if (!calendarButton) {
        console.log('AwesomeUI: calendar button not found!');
        return;
    }
    const hideCalendar = () => {
        agendaPlugin!.classList.remove('visible');
        calendarButton.classList.remove('active');
    }

    const calendarClickHandler = () => {
        setSidebarWidthVar();
        agendaButton.click();
        calendarButton.classList.add('active');
    }

    calendarButton.addEventListener('click', calendarClickHandler, false);

    logseq.App.onRouteChanged(({ path }) => {
        if (path !== '/page/Calendar') {
            hideCalendar();
        }
    });

    logseq.App.onSidebarVisibleChanged(() => {
        setSidebarWidthVar();
    });
}

export const calendarUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-calendar-css-${globalContext.pluginID}"]`)?.remove();
    doc.querySelector('.nav-header .calendar-nav')?.remove();
}
