<template>
  <main>
    <div class="event_Style flex">
      <section class="flex3 flex cross_center" style="background: #ffffff; margin-right: 15px;padding: 15px; box-sizing: border-box; flex-shrink: 0;">
        <div class="title_name">李天风，下午好！</div>
        <div style="margin-left: 52px;">{{date | formatDate}}</div>
        <div style="margin-left: 16px;">待办事项</div>
      </section>
      <section class="flex1 flex" style="background: #ffffff; margin-right: 15px;padding: 15px; box-sizing: border-box;">
        <img src="../assets/img/index/icon-waiting for check.png" alt="" class="Icon">
        <section class=" col main_space" style="height: 62px; margin-left: 24px; flex-shrink: 0;">
          <section class="icon_word">待确认</section>
          <section class="icon_number">12</section>
        </section>
      </section>
      <section class="flex1 flex" style="background: #ffffff; margin-right: 15px; padding: 15px; box-sizing: border-box;">
        <img src="../assets/img/index/icon-processing.png" alt="" class="Icon">
        <section class=" col main_space" style="height: 62px; margin-left: 24px; flex-shrink: 0;">
          <section class="icon_word">待处理</section>
          <section class="icon_number">12</section>
        </section>
      </section>
      <section class="flex1 flex" style="background: #ffffff;padding: 15px; box-sizing: border-box;">
        <img src="../assets/img/index/icon-verify.png" alt="" class="Icon">
        <section class=" col main_space" style="height: 62px; margin-left: 24px; flex-shrink: 0;">
          <section class="icon_word">待审核</section>
          <section class="icon_number">12</section>
        </section>
      </section>
    </div>
    <!-- <div style="width: 70%; background: #ffffff; padding: 20px;">
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
        
    </div> -->
    <section class="flex" style="height: 100%">
      <section class="calendar" style="height: 100%; overflow-y: scroll;">
        <section class="main_space" style="height: 62px; border-bottom: 1px solid #EDEBE9">
          <span class="word">事项分布-最后期限</span>
        </section>
        <section>
           <!-- width: 455px !important; -->
           <div style="background: #ffffff; padding: 20px;">
            <fullcalendar
              defaultView="dayGridMonth"
              :plugins="calendarPlugins"
              :selectable = "true"
              :header="header"
              :views="views"
              :button-text="buttonText"
              :fixed-week-count="false"
              :day-render="dayRender"
              @dateClick="dateClick"
              themeSystem="bootstrap"/>
          </div>
        </section>
      </section>
      <section class="event">
        <section class="main_space" style="height: 62px; border-bottom: 1px solid #EDEBE9">
          <div class="flex">
            <span class="word">事项列表</span>
            <div class="cross_center" style="margin-left: 5px;">
              <el-tooltip class="item" effect="dark" content="<事项分布>日历中所选日期对应的事项分布" placement="top-start">
                <div slot="content">
                  <p>《事项分布》</p>
                  <p>日历中所选日期对应的事项分布</p>
                </div>
                <!-- <i class="el-icon-question" style="color: #999;"></i> -->
                <img src="../assets/img/index/help-circle.png" alt="" style="width: 20px; height: 20px;">
              </el-tooltip>
          </div>
          </div>
          <span class="time">2020-04-18</span>
        </section>
        <section class="eventItem" v-for="(item, index) in eventList" :key="index">
          <section class="header main_space">
            <span>{{item.companyName}}</span>
            <span>{{item.bondNum}}</span>
          </section>
          <section class="event_content main_space">
            <span>{{item.index}}</span>
            <span>{{item.name}}</span>
            <span></span>
          </section>
        </section>
      </section>
    </section>
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
  private date: any = new Date()
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
    day: '日',
  }
  private weekdayList = ['日', '一', '二', '三', '四', '五', '六'];
  private views = {
    dayGridMonth: {
      titleFormat: 'YYYY[年]MM[月]',
      columnHeaderText: (date: any) => this.weekdayList[date.getDay()],
    },
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
  private dateClick(info: any) {
    console.log(info.dateStr)
  }
  private eventList: any = [
    {
      id: 1,
      index: 1,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 2,
      index: 2,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 3,
      index: 3,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 4,
      index: 4,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 5,
      index: 5,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 6,
      index: 6,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 7,
      index: 7,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 8,
      index: 8,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 9,
      index: 9,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
    {
      id: 10,
      index: 10,
      companyName: '北京**国有投资有限公司',
      bondNum: '16债券01',
      name: '2019年度披露',
    },
  ]
}
</script>
<style lang="less">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
main{
  .event_Style{
    width: 100%;
    // height: 93px;
    // background: #ffffff;
    margin-bottom: 14px;
    // padding: 15px 0;
    // box-sizing: border-box;
    .title_name{
      font-size:16px;
      font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
      font-weight:bold;
      color:rgba(76,76,78,1);
      line-height:20px;
      margin-left: 24px;
    }
    .Icon{
      width: 62px;
      height: 62px;
    }
    .icon_number{
      font-size:20px;
      font-family:DINPro-Black,DINPro;
      font-weight:900;
      color:rgba(76,76,78,1);
      margin-bottom: 5px;
    }
    .icon_word{
      font-size:14px;
      font-family:MicrosoftYaHeiUI;
      color:rgba(76,76,78,1);
      margin-top: 5px;
    }
  }
  .fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number{
    float: left;
    margin: 10px 0 0 10px;
  }
  .fc{
    .fc-header-toolbar{
      h2{
        font-weight: normal;
        font-size:14px;
        line-height: 32px;
      }
      .fc-center{
        color:#4C4C4E;
        font-size: 14px;
        position: absolute;
        top: 16px;
        left: 25%;
        width: 200px;
        font-weight: normal;
      }
      .fc-right{
        position: absolute;
        top: 16px;
        right: 10px;
        .fc-button-primary{
          border: none;
          background: transparent;
          color: #4C4C4E;
          font-size: 14px;
          line-height: 30px;
        }
        .fc-prev-button:after{
          content: '上个月'
        }
        .fc-next-button:before{
          content: '下个月'
        }
        // .fc-today-button:before{
        //   content: "";
        //   background: url('../assets/img/index/calendar.png') no-repeat 0 0;
        //   width: 20px;
        //   height: 20px;
        //   display: inline-block;
        //   // margin: 0 5px 0 0;
        //   // line-height:30px;
        //   position: absolute;
        //   top:5px;
        //   left:200px;
        // }
      }
    }
    .fc-view-container{
      .fc-head{
        height: 30px;
        line-height: 30px;
      }
      .fc-head-container{
        .fc-row{
          height: 30px !important;
          // th{
          //   width: 64px !important;
          // }
        }
      }
      .fc-row{
        height: 60px !important;
      }
      .fc-view-container{
        height: 560px !important;
      }
    }
    .fc-day-grid-container {
      height: auto !important;
    }
    .fc-day-grid-container::-webkit-scrollbar{
      display: none;
    }
    .fc-bg {
      .fc-day {
        // width: 64px !important;
        height: 64px !important;
        position: relative;
        cursor: pointer;
        // border: none;
        .cell-wrap {
          position: absolute;
          top: 30%;
          left: -20%;
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
              width: 16px;
              height: 16px;
              font-size: 14px;
              font-weight: bold;
              line-height: 16px;
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
  .calendar{
    // flex-grow: 1;
    width:calc(100% - 293px);
    min-width: 754px;
    background:#ffffff;
    padding: 0 24px;
    box-sizing: border-box;
    position: relative;
    .word{
      display: inline-block;
      height: 93%;
      font-size:16px;
      font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
      font-weight:bold;
      color:rgba(76,76,78,1);
      line-height:62px;
      border-bottom: 4px solid #F88200;
    }
  }
  .calendar::-webkit-scrollbar{
    display: none;
  }
  .event{
    width:293px;
    height:100%;
    background:rgba(255,255,255,1);
    margin-left: 14px;
    padding: 0 24px;
    box-sizing: border-box;
    flex-shrink: 0;
    overflow-y: scroll;
    .word{
      display: inline-block;
      width:64px;
      height: 93%;
      font-size:16px;
      font-family:MicrosoftYaHeiUI-Bold,MicrosoftYaHeiUI;
      font-weight:bold;
      color:rgba(76,76,78,1);
      line-height:62px;
      border-bottom: 4px solid #F88200;
    }
    .time{
      height:100%;
      font-size:16px;
      font-family:DINPro-Medium,DINPro;
      font-weight:500;
      color:rgba(186,187,203,1);
      line-height:62px;
    }
    .eventItem{
      width:100%;
      height:66px;
      border-radius:2px;
      // border:1px solid rgba(237,235,233,1);
      // box-sizing: border-box;
      margin-top: 20px;
      cursor: pointer;
      .header{
        width:100%;
        height:28px;
        background:rgba(248,130,0,1);
        border-radius:2px 2px 0px 0px;
        color: #ffffff;
        line-height: 28px;
        padding: 0 5px;
        box-sizing: border-box;
        font-size:14px;
        font-weight:bold;
      }
      .event_content{
        width:100%;
        height: 38px;
        border:1px solid rgba(237,235,233,1);
        box-sizing: border-box;
        line-height: 38px;
        padding: 0 5px;
        box-sizing: border-box;
      }
    }
  }
  .event::-webkit-scrollbar{
    display: none;
  }
}
</style>