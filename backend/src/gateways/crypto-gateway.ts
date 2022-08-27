import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import {Server,Socket} from "socket.io"
import { Logger } from "@nestjs/common";
import { CryptoPriceInterface } from "../utils/interfaces/binance-gateway.interface";
import { ElasticService } from "../elastic/services/elastic.service";
const Websocket=require("ws")

@WebSocketGateway({ cors:true })
export class CryptoGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
  constructor(private elasticService:ElasticService)
  {}

  @WebSocketServer() wss:Server
  logger=new Logger("crypto-socket")

  public roomClientNumbers:number=0

  afterInit(server: Server): any {
    this.logger.log("Gateway Running...")
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.joinRoom(client)
    this.logger.warn(`User with id ${client.id} connected...`)
  }

  joinRoom(client:Socket)
  {
    client.join("allPrices")
    this.roomClientNumbers+1
  }

  leaveRoom(client:Socket)
  {
    client.leave("allPrices")
    this.roomClientNumbers-1
  }

  handleDisconnect(client: Socket): any {
  this.leaveRoom(client)
    const checkRoomNumber=this.roomClientNumbers
    console.log(checkRoomNumber);
    if (checkRoomNumber==0)
      this.wss.sockets.disconnectSockets(true)

    this.logger.warn(`User with id ${client.id} disconnected...`)
  }

  @SubscribeMessage("prices")
  async sendPrices(@ConnectedSocket() client:Socket,@MessageBody() text:string[])
  {
    for (const coins of text) {
      const socketConn=new Websocket(`wss://stream.binance.com:9443/ws/${coins}@trade`)
      socketConn.onmessage=async (res)=>{
        const data:CryptoPriceInterface=JSON.parse(res.data)
        this.wss.to("allPrices")
          .emit(coins,data)
      }
    }
    // const market=await this.marketRepo.findOne({where:{name:text}})

  }

}