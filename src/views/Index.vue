<template>
  <main class="flex1">
    <div style="width: 70%; background: #ffffff; padding: 20px;">
        <!-- locale="zh-cn" -->
      <fullcalendar
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        :selectable = "true"
        :header="header"
        :views="views"
        :button-text="buttonText"
        :fixed-week-count="false"
        :day-render="dayRender"
        themeSystem="bootstrap"/>
        
    </div>
  </main>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import fullcalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
@Component({
  components: {
    fullcalendar,
  },
})
export default class Index extends Vue {
  private calendarPlugins = [ dayGridPlugin, interactionPlugin, momentPlugin ]
  private header = {
    left: '',
    center: 'title',
    right: ' prev, today, next',
  }
  private events = [
    {
      id: 2,
      title: '3',
      start: '2020-04-01',
    },
    {
      id: 4,
      title: '2',
      start: '2020-04-02',
    },
    {
      id: 3,
      title: '5',
      start: '2020-04-11',
    },
  ]
  private buttonText = {
    today: '今天',
    month: '月',
    week: '周',
    day: '日'
  }
 
  private weekdayList = ['日', '一', '二', '三', '四', '五', '六'];
  private views = {
    dayGridMonth: {
      titleFormat: 'YYYY[年]MM[月]',
      columnHeaderText: (date: any) => this.weekdayList[date.getDay()]
    }
  }
  private dayRender(info: any) {
    // console.log(info)
    if (this.events.length) {
      this.events.map((item: any) => {
        // console.log(item)
        const itemDate = new Date(item.start + ' 00:00:00');
        if (itemDate.getTime() === info.date.getTime()) {
          console.log(11)
          info.el.innerHTML = `
            <div class="cell-wrap">
              <p class="fc-Number-self">${item.title}</p>
            </div>`;
        }
      })
    }
  }
}
</script>
<style lang="less">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
main{
  .fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number{
    float: left;
  }
  .fc{
    .fc-header-toolbar{
      .fc-center{
        color:#FF8C00;
        font-size: 14px;
        font-size: 10;
      }
      .fc-right{
        .fc-button-primary{
          border: none;
          background: transparent;
          color: #000;
        }
        .fc-prev-button:after{
          content: ''
        }
      }
    }
    .fc-view-container{
      .fc-head{
        height: 30px;
        line-height: 30px;
      }
      .fc-body{
        .fc-widget-content {
          //  border: none;
          .fc-day-grid-container {
            height:calc(100vh - 200px) !important;
            // overflow: hidden !important;
            &.fourLineGrid .fc-day,
            &.fourLineGrid .fc-row {
              height: 77px !important;
              min-height: 77px;
              overflow: hidden;
            }
            &.fiveLineGrid .fc-day,
            &.fiveLineGrid .fc-row {
              height: 62px !important;
              min-height: 62px;
              overflow: hidden;
            }
            &.sixLineGrid .fc-day,
            &.sixLineGrid .fc-row {
              height: 51px !important;
              min-height: 51px;
              overflow: hidden;
            }
            // .fc-bg {
            //   .fc-day {
            //     position: relative;
            //     cursor: pointer;
            //     // border: none;
            //     .cell-wrap {
            //       position: absolute;
            //       top: 50%;
            //       left: 50%;
            //       box-sizing: border-box;
            //       display: flex;
            //       flex-direction: column;
            //       align-items: center;
            //       justify-content: center;
            //       width: 44px;
            //       height: 44px;
            //       border-radius: 50%;
            //       transform: translate(-50%, -50%);
            //       p {
            //         margin: 0;
            //         &.fc-Number-self {
            //           font-size: 14px;
            //           font-weight: bold;
            //           line-height: 19px;
            //           color: #4a4a4a;
            //         }
            //       }
            //     }
            //   }
            // }
            // &.sixLineGrid .fc-bg {
            //   .fc-day {
            //     .cell-wrap {
            //       width: 38px;
            //       height: 38px;
            //     }
            //     .OtherHoliday {
            //       bottom: 0;
            //     }
            //   }
            // }
            // .fc-content-skeleton {
            //   .fc-day-number {
            //     display: none;
            //   }
            // }
          }
        }
      }
    }
    .fc-bg {
      .fc-day {
        position: relative;
        cursor: pointer;
        // border: none;
        .cell-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          p {
            margin: 0;
            &.fc-Number-self {
              width: 20px;
              height: 20px;
              font-size: 14px;
              font-weight: bold;
              line-height: 19px;
              color: #ffffff;
              background: #FF8C00;
              border-radius: 50%;
              text-align: center;
            }
          }
        }

      }
    }
  }
 
}
</style>