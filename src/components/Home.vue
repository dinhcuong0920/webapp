<template>
  <div class="body">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Money Flow</a>
    </nav>
    <div class="container">
    <div class="row pt-5">
      <div class="col-6">
        <div class="panel">
          <select name="" id="" v-model="timerSelected" class="form-control">
            <option v-for="(time, ix) of rangeTime" :key="ix" :value="time">{{ time }} Tháng</option>
          </select>
        </div>
      </div>
      <div class="col-3"></div>
      <div class="col-3 text-right">
        <button type="button" class="btn btn-primary waves-effect waves-themed" data-toggle="modal"
          data-target="#token-modal">Token</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="panel">
          <div class="panel-hdr">
            <h2>Dòng tiền theo nhóm ngành</h2>
          </div>
          <div class="panel-container show">
            <div class="panel-content">
              <nav>
                <div class="nav nav-tabs" role="tablist">
                  <a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true" v-for="(item,index) in dataTimeSimplize" :key="index" :href="`#nav-${item.name}`" :class="index == 0? 'active' : ''">{{ item.name }}</a>
                </div>
              </nav>
              <div class="tab-content p-5">
                <div class="tab-pane fade" v-for="(item,index) in dataTimeSimplize" :key="index" :class="index == 0? 'active show' : ''" :id="`nav-${item.name}`" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div class="row" v-for="(it, idx) in convertDataFromSimplize(item.value, dataSimplize)" :key="idx">
                    <div class="col-3">
                      <label>{{ it.bcEconomicSectorName }}</label>
                    </div>
                    <div class="col-6">
                      <div class="progress" v-if="item.name == '7D'">
                        <div class="progress-bar" :class="it.pricePctChg7d > 0? 'bg-green' : 'bg-red'" role="progressbar" :style="`width: ${Math.abs(it.pricePctChg7d)}%`" :aria-valuenow="Math.abs(it.pricePctChg7d)" aria-valuemin="0" aria-valuemax="100">{{ it.pricePctChg7d }} %</div>
                      </div>
                      <div class="progress" v-if="item.name == '30D'">
                        <div class="progress-bar" :class="it.pricePctChg30d > 0? 'bg-green' : 'bg-red'" role="progressbar" :style="`width: ${Math.abs(it.pricePctChg30d)}%`" :aria-valuenow="Math.abs(it.pricePctChg30d)" aria-valuemin="0" aria-valuemax="100">{{ it.pricePctChg30d }} %</div>
                      </div>
                      <div class="progress" v-if="item.name == '1Y'">
                        <div class="progress-bar" :class="it.pricePctChg1y > 0? 'bg-green' : 'bg-red'" role="progressbar" :style="`width: ${Math.abs(it.pricePctChg1y)}%`" :aria-valuenow="Math.abs(it.pricePctChg1y)" aria-valuemin="0" aria-valuemax="100">{{ it.pricePctChg1y }} %</div>
                      </div>
                      <div class="progress" v-if="item.name == '3Y'">
                        <div class="progress-bar" :class="it.pricePctChg3y > 0? 'bg-green' : 'bg-red'" role="progressbar" :style="`width: ${Math.abs(it.pricePctChg3y)}%`" :aria-valuenow="Math.abs(it.pricePctChg3y)" aria-valuemin="0" aria-valuemax="100">{{ it.pricePctChg3y }} %</div>
                      </div>
                      <div class="progress" v-if="item.name == '5Y'">
                        <div class="progress-bar" :class="it.pricePctChg5y > 0? 'bg-green' : 'bg-red'" role="progressbar" :style="`width: ${Math.abs(it.pricePctChg5y)}%`" :aria-valuenow="Math.abs(it.pricePctChg5y)" aria-valuemin="0" aria-valuemax="100">{{ it.pricePctChg5y }} %</div>
                      </div>
                      <div class="progress" v-if="item.name == 'Ytd'">
                        <div class="progress-bar" :class="it.pricePctChgYtd > 0? 'bg-green' : 'bg-red'" role="progressbar" :style="`width: ${Math.abs(it.pricePctChgYtd)}%`" :aria-valuenow="Math.abs(it.pricePctChgYtd)" aria-valuemin="0" aria-valuemax="100">{{ it.pricePctChgYtd }} %</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-for="(item,index) in data" :id="`panel-${item.code}`" :key="index" class="panel mb-5">
          <div class="panel-hdr">
            <h2>
              {{ item.name }}
            </h2>
            <div class="panel-toolbar">
              <button class="btn btn-panel waves-effect waves-themed" data-action="panel-collapse" data-toggle="tooltip"
                data-offset="0,10" data-original-title="Collapse"></button>
              <button class="btn btn-panel waves-effect waves-themed" data-action="panel-fullscreen"
                data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>
              <button class="btn btn-panel waves-effect waves-themed" data-action="panel-close" data-toggle="tooltip"
                data-offset="0,10" data-original-title="Close"></button>
            </div>
          </div>
          <div class="panel-container show">
            <div class="form-group row mt-4">
              <label class="col-form-label col-12 col-lg-3 form-label text-lg-right">Range Date</label>
              <div class="col-12 col-lg-6">
                <div class="input-daterange input-group" id="datepicker-5">
                  <input type="date" class="form-control" name="start" v-model="data[index].from">
                  <div class="input-group-append input-group-prepend">
                    <span class="input-group-text fs-xl"><i class="fal fa-ellipsis-h"></i></span>
                  </div>
                  <input type="date" class="form-control" name="end" v-model="data[index].to" disabled="disable">
                  <a class="btn btn-primary ml-3" @click="getData(index)">OK</a>
                </div>
              </div>
              <div class="indicator" v-if="item.totalValue.length > 0">
                <p>
                  <span class="badge" :class="upIs(item.indexHigh)?'badge-success': 'badge-danger'">Price(MA20)</span>
                  <span class="badge" :class="upIs(item.totalValue)?'badge-success': 'badge-danger'">Volume(MA20)</span>
                </p>
                <p v-if="item.indexHigh.length >= 50">
                  <span class="badge"
                    :class="upIs(item.indexHigh, 50)?'badge-success': 'badge-danger'">Price(MA50)</span>
                  <span class="badge"
                    :class="upIs(item.totalValue, 50)?'badge-success': 'badge-danger'">Volume(MA50)</span>
                </p>
              </div>
            </div>
            <div class="panel-content">
              <div class="panel-tag">
                <money-flow
                  v-if="item.totalValue.length > 0 && getMin(item.totalValue) > 0 && getMin(item.indexHigh) > 0"
                  :dataset="{
                    volumeGrowth: item.totalValue,
                    priceGrowth: item.indexHigh
                  }" :maxYLeft="getMax(item.totalValue) * 1.5" :minYLeft="getMin(item.totalValue)"
                  :maxYRight="getMax(item.indexHigh) + 5" :minYRight="getMin(item.indexHigh) - 5"
                  :title="item.totalValue" :labels="item.date">
                </money-flow>
              </div>
              <div class="frame-wrap w-100 pt-3">
                <div class="accordion" id="js_demo_accordion-4">
                  <div class="card" v-for="(i,idx) in item.child" :key="idx">
                    <div class="card-header">
                      <a href="javascript:void(0);" class="card-title collapsed uppercase" data-toggle="collapse"
                        :data-target="`#js_demo_accordion-${i.code}`" aria-expanded="false"
                        @click="getData(index, idx, false)">
                        {{ i.name }}
                        <span class="ml-auto">
                          <span class="collapsed-reveal">
                            <i class="fal fa-minus-circle text-danger fs-xl"></i>
                          </span>
                          <span class="collapsed-hidden">
                            <i class="fal fa-plus-circle text-success fs-xl"></i>
                          </span>
                        </span>
                      </a>
                    </div>
                    <div :id="`js_demo_accordion-${i.code}`" class="collapse" data-parent="#js_demo_accordion-4"
                      style="">
                      <div class="card-body">
                        <div class="form-group row">
                          <label class="col-form-label col-12 col-lg-3 form-label text-lg-right">Range Date</label>
                          <div class="col-12 col-lg-6">
                            <div class="input-daterange input-group" id="datepicker-5">
                              <input type="date" class="form-control" name="start"
                                v-model="data[index].child[idx].from">
                              <div class="input-group-append input-group-prepend">
                                <span class="input-group-text fs-xl"><i class="fal fa-ellipsis-h"></i></span>
                              </div>
                              <input type="date" class="form-control" name="end" v-model="data[index].child[idx].to"
                                disabled="disable">
                              <a class="btn btn-primary ml-3" @click="getData(index, idx)">OK</a>
                            </div>
                          </div>
                          <div class="indicator" v-if="i.totalValue.length > 0">
                            <p>
                              <span class="badge"
                                :class="upIs(i.indexHigh)?'badge-success': 'badge-danger'">Price(MA20)</span>
                              <span class="badge"
                                :class="upIs(i.totalValue)?'badge-success': 'badge-danger'">Volume(MA20)</span>
                            </p>
                            <p v-if="i.indexHigh.length >= 50">
                              <span class="badge"
                                :class="upIs(i.indexHigh, 50)?'badge-success': 'badge-danger'">Price(MA50)</span>
                              <span class="badge"
                                :class="upIs(i.totalValue, 50)?'badge-success': 'badge-danger'">Volume(MA50)</span>
                            </p>
                          </div>
                        </div>
                        <money-flow
                          v-if="i.totalValue.length > 0  && getMin(i.totalValue) > 0 && getMin(i.indexHigh) > 0"
                          :dataset="{
                            volumeGrowth: i.totalValue,
                            priceGrowth: i.indexHigh
                          }" :maxYLeft="getMax(i.totalValue) * 1.5" :minYLeft="getMin(i.totalValue)"
                          :maxYRight="getMax(i.indexHigh) + 5" :minYRight="getMin(i.indexHigh) - 5"
                          :title="i.totalValue" :labels="i.date"></money-flow>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <token @setToken="setToken"></token>
  </div>
  </div>
  
</template>
<script>
  import _ from 'lodash'
  import moment from 'moment'
  import axios from 'axios'
  import MoneyFlow from '@/components/MoneyFlow'
  import Token from '@/components/Token'
  export default {
    components: {
      MoneyFlow, Token
    },
    data() {
      return {
        urlApi: 'https://restv2.fireant.vn',
        urlApiSimplize: 'https://api.simplize.vn/api',
        curDay: moment().format('YYYY-MM-DD'),
        cusDay: null,
        rangeTime: [1, 3, 6, 9, 12, 24],
        timerSelected: 3,
        dataTimeSimplize: [
          {
            name: '7D',
            value: 'pricePctChg7d'
          },
          {
            name: '30D',
            value: 'pricePctChg30d'
          },
          {
            name: '1Y',
            value: 'pricePctChg1y'
          },
          {
            name: '3Y',
            value: 'pricePctChg3y'
          },
          {
            name: '5Y',
            value: 'pricePctChg5y'
          },
          {
            name: 'Ytd',
            value: 'pricePctChgYtd'
          }
        ],
        dataSimplize: [],
        data: [{
            name: 'tài chính',
            code: 8000,
            indexHigh: [],
            totalValue: [],
            date: [],
            from: null,
            to: null,
            child: [{
                name: 'bank',
                code: 8350,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              },
              {
                name: 'bất động sản',
                code: 8630,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              },
              {
                name: 'chứng khoán',
                code: 8780,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              }
            ]
          },
          {
            name: 'bán lẻ',
            code: 5370,
            indexHigh: [],
            totalValue: [],
            date: [],
            from: null,
            to: null,
            child: []
          },
          {
            name: 'Công nghiệp',
            code: 2000,
            indexHigh: [],
            totalValue: [],
            date: [],
            from: null,
            to: null,
            child: [
              {
                name: 'vật liệu xây dựng',
                code: 2350,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              },
              {
                name: 'vận tải',
                code: 2770,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              }
            ]
          },
          {
            name: 'vật liệu cơ bản',
            code: 1000,
            indexHigh: [],
            totalValue: [],
            date: [],
            from: null,
            to: null,
            child: [{
                name: 'kim loại công nghiệp',
                code: 1750,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              },
              {
                name: 'hóa chất',
                code: 1350,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              },
              {
                name: 'khai khoáng',
                code: 1770,
                indexHigh: [],
                totalValue: [],
                date: [],
                from: null,
                to: null,
              }
            ]
          }

        ]
      }
    },
    watch: {
      timerSelected: {
        async handler() {
          await this.getDataWithTime('PARENT')
        }
      }
    },
    async mounted() {
      await this.getDataWithTime()
      await this.getDataFromSimplize()
    },
    methods: {
      async getDataWithTime(type=null) {
        this.cusDay = moment(this.curDay).subtract(this.timerSelected, 'months').format('YYYY-MM-DD')
        this.setTime(type)
        for (let index in this.data) {
          await this.getData(index)
        }
      },
      async callApi(code, from, to) {
        const token = this.getCookie('token')
        if (!token) {
          return
        }
        const header = {
          Authorization: token
        }
        const res = await axios.get(`${this.urlApi}/industries/${code}/historical-stats?startDate=${from}&endDate=${to}`, {
          headers: header
        })
        return res.data
      },
      async getData(parentIndex=null, childIndex=null, callBack=true) {
        const item = childIndex !== null ? this.data[parentIndex].child[childIndex]: this.data[parentIndex]
        if(item.indexHigh.length > 0 && !callBack) {
          return
        }
        await this.callApi(item.code, item.from, item.to).then((res) => {
          if (childIndex !== null) {
            this.data[parentIndex].child[childIndex].indexHigh = _.map(res, 'indexHigh')
            this.data[parentIndex].child[childIndex].totalValue = _.map(res, 'totalValue')
            this.data[parentIndex].child[childIndex].date = _.map(res, (o) => {
              return moment(o.date).format('DD-MM-YYYY')
            })
          } else {
            this.data[parentIndex].indexHigh = _.map(res, 'indexHigh')
            this.data[parentIndex].totalValue = _.map(res, 'totalValue')
            this.data[parentIndex].date = _.map(res, (o) => {
              return moment(o.date).format('DD-MM-YYYY')
            })
          }
        })
      },
      async getDataFromSimplize() {
        const token = this.getCookie('token-simplize')
        if (!token) {
          return
        }
        const header = {
          Authorization: token
        }
        const res = await axios.get(`${this.urlApiSimplize}/api/company/se/sector-performance`, {
          headers: header
        })
        console.log(res)
        this.dataSimplize = res.data.sectorPerformances
        return res.data
      },
      async setToken(token) {
        document.cookie = `token=${token}`
        await this.getDataWithTime()
      },
      convertDataFromSimplize(type, data) {
        return _.orderBy(data, [type], ['desc'])
      },
      getCookie(name) {
        const escape = (s) => { return s.replace(/([.*+?$(){}|\]\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
      },
      upIs(arr, abs = 20) {
        const lastValue = _.last(arr)
        const newArr = arr.length > abs? _.slice(arr, arr.length - abs - 1,arr.length - 1): arr
        if (lastValue > _.sum(newArr)/newArr.length) {
          return true
        } else {
          return false
        }
      },
      setTime(type) {
        for(let index in this.data) {
          this.data[index].from = this.cusDay
          this.data[index].to = this.curDay
          if (!type) {
            for(let i in this.data[index].child) {
              this.data[index].child[i].from = this.cusDay
              this.data[index].child[i].to = this.curDay
            }
          }
        }
      },
      getMax(arr) {
        return Math.max(...arr)
      },
      getMin(arr) {
        return Math.min(...arr)
      }
    },
  };

</script>

<style>
h2 , a.card-title{
  text-transform: uppercase;
}
div.panel-container div.indicator{
  position: absolute;
  right: 20px;
}
a.btn {
  color: #FFF !important;
}
span.badge {
  margin-right: 5px;
}
ul.list-inline {
  display: inline-flex;
}
ul.list-inline li a {
  margin: 0px 10px;
}
@media only screen and (max-width: 600px) {
  div.panel-container div.indicator{
    position: relative;
    margin: 10px auto;
  }
}
.progress-bar{
  background-color: unset;
}
.bg-green {
  background-color: #2BD784;
}
.bg-red {
  background-color: #E14040;
  color: #333;
}
</style>