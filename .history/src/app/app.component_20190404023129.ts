import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Início',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Faltas',
      url: '/faltas',
      icon: 'list'
    },
    {
      title: 'Notas',
      url: '/notas',
      icon: 'list'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Checa as permissões
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });

      // Cria o canal 'all' para enviar mensagens para todos os usuários do APP.
      // Pode ser criado vários canais para segmentar as mensagens
      // Pegar os dados do período do aluno e criar um canal
      this.push.createChannel({
        id: 'all',
        description: 'Todos',
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
      }).then(() => console.log('Channel created'));

      const options: PushOptions = {
        android: {},
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };

      const pushObject: PushObject = this.push.init(options);

      // Recebe a notificação e chama a função mostraMensagem para mostrar o Toast
      pushObject.on('notification').subscribe((notification: any) => {
        console.log('Received a notification', notification);
        this.mostraMensagem(notification.message);
      });
      pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }

  // Mostra a mensagem no topo quando o APP estiver em primeiro plano
  async mostraMensagem(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });
    toast.present();
  }
}
