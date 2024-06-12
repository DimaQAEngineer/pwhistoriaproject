import { Page, chromium } from 'playwright';

export default class MainPage {
  
  private baseUrl: string = 'https://www.historia.net/de-de';

  constructor(private page: Page) {}

  async openbaseURL() {
    await this.page.goto('https://www.historia.net/de-de/');
  }

  async acceptAllCookies() {
    console.log("Start of the method to close cookies pop-up");
    if (await this.page.$("iframe[title='Message bubble']") !== null) {
      await this.closetheframe();
    }
    await this.page.getByRole('button', { name: 'Alles akzeptieren' }).click();
  }

  async select1stMenuItem(index: number) {
    console.log("Click on navigation menu with index " + index + " !");
    console.log("Menu item name is " + await this.page.textContent("li[class*='nav-" + index + "']:not(li[class*='" + index + "-'])") + " !");
    await this.page.click("li[class*='nav-" + index + "']:not(li[class*='" + index + "-'])");
  }

  async select2dMenuItem(parent: number, index: number) {
    console.log("Click on " + parent + " parent element > item with id " + index + " .");
    console.log("Perform move to li element");
    await this.page.hover("li[class*='nav-" + parent + "']:not(li[class*='" + parent + "-'])");
    console.log("Element of menu with index " + parent + " is " + await this.page.textContent("li[class*='nav-1-" + parent + "'] a") + " !!");
    await this.page.click("li[class*='nav-" + parent + "-" + index + "'] a");
  }

  async checkTheDataFinderIsOnThePage() {
    console.log("Check The Datafinder is on the home page");
    await this.page.hover(".gift-matcher");
  }

  async checkTheDataFinderIsOnThe404Page() {
    console.log("Check The Datafinder is on the 404 page");
    await this.page.waitForSelector(".datefinder");
  }

  async selectTheDayOnTheDatafinder() {
    console.log("Select the Day on the DataFinder with value: 3 !!!");
    await this.page.selectOption("select[name='day']", { value: "3" });
  }

  async selectTheMonthOnTheDatafinder() {
    console.log("Select the Month on the DataFinder with value: 3 !!!");
    await this.page.selectOption("select[name='month']", { value: "3" });
  }

  async selectTheYearOnTheDatafinder() {
    console.log("Select the Year on the DataFinder with value: 1949 !!!");
    await this.page.selectOption("select[name='year']", { value: "1949" });
  }

  async selectTheRandomDayOnTheDatafinder() {
    console.log("Select the Day on the DataFinder randomly!");
    const daysSelect = await this.page.$("select[name='day']");
    const random = Math.floor(Math.random() * 31) + 1; // Потрібно додати 1, оскільки масив індексується з 0
    if (daysSelect) {
        await daysSelect.selectOption(random.toString());
    } else {
        console.error("Day select element not found");
    }
}

async selectTheRandomMonthOnTheDatafinder() {
    console.log("Select the Month on the DataFinder randomly!");
    const monthsSelect = await this.page.$("select[name='month']");
    const random = Math.floor(Math.random() * 12) + 1; // Потрібно додати 1, оскільки масив індексується з 0
    if (monthsSelect) {
        await monthsSelect.selectOption(random.toString());
    } else {
        console.error("Month select element not found");
    }
}

async selectTheRandomYearOnTheDatafinder() {
    console.log("Select the Year on the DataFinder randomly!");
    const yearsSelect = await this.page.$("select[name='year']");
    const random = Math.floor(Math.random() * 131) + 1890; // Починаючи з 1890 до поточного року
    if (yearsSelect) {
        await yearsSelect.selectOption(random.toString());
    } else {
        console.error("Year select element not found");
    }
}


  async checkThatZeitungenIsPresentOnThePage() {
    console.log("Check that the Zeitungen column is present on the page");
    await this.page.waitForSelector("//*[@aria-controls='tab-newspapers']");
    const newspapersCount = await this.page.$$("#tab-newspapers a");
    if (newspapersCount.length === 0) {
      console.log("No newspaper found");
      await this.page.waitForSelector("//h3[text()='Keine Zeitung gefunden']");
    } else {
      console.log("Number of newspapers found: " + newspapersCount.length);
    }
    await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
  }

  async checkThatZeitschriftenIsPresentOnThePage() {
    console.log("Check that the Zeitschriften column is present on the page");
    await this.page.click("a[href='#tab-magazines']");
    await this.page.waitForSelector("a[href='#tab-magazines']");
    const magazinesCount = await this.page.$$("#tab-magazines a");
    if (magazinesCount.length === 0) {
      console.log("No magazine found");
      await this.page.waitForSelector("//h3[text()='Keine Zeitschrift gefunden']");
    } else {
      console.log("Number of magazines found: " + magazinesCount.length);
    }
  }

  async clickOnTheZeitschriftenColumn() {
    console.log("Click on the Zeitschriften column");
    await this.page.click("a[href='#tab-magazines']");
  }

  async checkThatWeineIsPresentOnThePage() {
    console.log("Check that the Weine column is present on the page");
    await this.page.click("a[href='#tab-wines']");
    await this.page.waitForSelector("a[href='#tab-wines']");
    const winesCount = await this.page.$$("#tab-wines a");
    if (winesCount.length === 0) {
      console.log("No wine found");
      await this.page.waitForSelector("//h3[text()='Kein Wein gefunden']");
    } else {
      console.log("Number of wines found: " + winesCount.length);
    }
  }

  async checkThatTODAYDayIsOnTheDatafinder() {
    console.log("Check that TODAY day is on the datefinder-wrapper");
    const selectedDayElement = await this.page.$("select[name='day'] option[selected='selected']");
    const selectedMonthElement = await this.page.$("select[name='month'] option[selected='selected']");
    if (selectedDayElement && selectedMonthElement) {
        const selectedDay = await selectedDayElement.evaluate((el: HTMLOptionElement) => el.textContent);
        const selectedMonth = await selectedMonthElement.evaluate((el: HTMLOptionElement) => el.value);
        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth() + 1;
        if (parseInt(selectedDay!) !== todayDay || parseInt(selectedMonth!) !== todayMonth) {
            console.log("The day and month are not TODAY Day and Month");
        } else {
            console.log("The data is chosen correctly!");
        }
    } else {
        console.log("Selected day or month not found.");
    }
}


  async clickOnTheJahrgangsweine() {
    console.log("Click on the second bestseller on the main page");
    await this.page.click("a:has-text('Jahrgangsweine')");
  }

  async clickOnTheSucheButton() {
    console.log("Click on the Cuche/find button");
    await this.page.click("button[data-testid='submit-gift-matcher-button']");
  }

  async clickOnTheSucheButtonOnThe404page() {
    console.log("Click on the Cuche/find button on the 404 page");
    await this.page.click(".datefinder-button__submit");
  }

  async clickOnTheHistorischeZeitungen() {
    console.log("Click on the Historische Zeitungen");
    await this.page.click("a:has-text('Historische Zeitungen')");
  }

  async checkThatMainPageContainsProducts() {
    console.log("Check that main page contains products");
    const products = await this.page.$$("li.item.product.product-item");
    console.log("Number of products found: " + products.length);
  }

  async checkThatFirstProductCalledHistorischeZeitungen() {
    console.log("Check that first product called Historische Zeitungen");
    const firstProduct = await this.page.$("//*[@id='maincontent']/div[2]/ol/li[1]/div/div[2]/strong/a");
    if (firstProduct) {
        const productName = await firstProduct.textContent();
        if (productName === "Historische Zeitungen") {
            console.log("First product is Historische Zeitungen");
        } else {
            console.log("First product is not Historische Zeitungen");
        }
    } else {
        console.log("First product not found.");
    }
}

async checkThatSecondProductCalledHistorischeZeitschriften() {
    console.log("Check that second product called Historische Zeitschriften");
    const secondProduct = await this.page.$("//*[@id='maincontent']/div[2]/ol/li[2]/div/div[2]/strong/a");
    if (secondProduct) {
        const productName = await secondProduct.textContent();
        if (productName === "Historische Zeitschriften") {
            console.log("Second product is Historische Zeitschriften");
        } else {
            console.log("Second product is not Historische Zeitschriften");
        }
    } else {
        console.log("Second product not found.");
    }
}

async checkThatThirdProductCalledJahrgangsweine() {
    console.log("Check that third product called Jahrgangsweine");
    const thirdProduct = await this.page.$("//*[@id='maincontent']/div[2]/ol/li[3]/div/div[2]/strong/a");
    if (thirdProduct) {
        const productName = await thirdProduct.textContent();
        if (productName === "Jahrgangsweine") {
            console.log("Third product is Jahrgangsweine");
        } else {
            console.log("Third product is not Jahrgangsweine");
        }
    } else {
        console.log("Third product not found.");
    }
}

  async clickOnMEHRANZEIGEN() {
    console.log("Check that MEHR ANZEIGEN button is clickable and redirected to Geschenkideen page");
    await this.page.click("#maincontent > div.columns > div > a");
  }

  async clickonLogo() {
    console.log("Click on LOGO");
    await this.page.click("picture.logo__image");
  }

  async checkthatmainpagecontainsarticlesblock() {
    console.log("Check, that main page contains articles block 'Historische Zeitungen & Zeitschriften als Geschenkidee'");
    await this.page.waitForSelector("#maincontent > div.columns > div > div");
  }

  async clickonthecarticon() {
    console.log("Click on the cart icon");
    await this.page.click("#html-body > div.page-wrapper > header > div > div.block.block-minicart.block-minicart__main");
  }

  async gotofifthproductpage() {
    console.log("Add some product to cart");
    const fifthProduct = await this.page.$$("li.item.product.product-item")[4];
    await fifthProduct.click();
  }

  async CheckThatTheAgeCategoriesBlockIsOnTheMainPage() {
    console.log("Check that the Age Categories block is on the main page");
    await this.page.waitForSelector(".age-categories");
    const ageCategoryLinks = await this.page.$$("a.his-category-widget");
    console.log("Number of age categories: " + ageCategoryLinks.length);
    await Promise.all(ageCategoryLinks.map(async (link) => {
      const title = await link.getAttribute("title");
      console.log("Check is " + title + " is presented");
      await link.click();
      await this.page.waitForNavigation();
      console.log("Current URL: " + this.page.url());
      await this.page.goBack();
      await this.page.waitForNavigation();
      console.log("Current URL: " + this.page.url());
    }));
  }

  async checkTheNewsletterIsOnTheMainPage() {
    console.log("Check the Newsletter is on the Main Page");
    await this.page.click("button:has-text('Newsletter abonnieren')");
    await this.page.waitForSelector("h1:has-text('Abonnieren Sie unseren Newsletter!')");
  }

  async newsletterSubscription() {
    console.log("Check the customer can use Newsletter Subscription");
    await this.page.fill("input.input-text.prefix", "Test");
    await this.page.fill("div.field.firstname input[name='firstname']", "Testfirst");
    await this.page.fill("div.control input#lastname", "TestLast");
    await this.page.fill("input#newsletter", "TestingTe@proton.me");
    await this.page.check("input#agreement");
    await this.page.click("button[title='Jetzt anmelden']");
  }

  async gotosomeproductpage() {
    console.log("Add some product to cart");
    const product = await this.page.$$("li.item.product.product-item")[6];
    await product.click();
  }

  async closetheframe() {
    console.log("Close pop-up with chat");
    const frames = await this.page.frames();
    const frameWithTitle = frames.find(frame => frame.name() === 'Message bubble');
    if (frameWithTitle) {
        await frameWithTitle.waitForSelector("button.frame-1gk");
        await frameWithTitle.click("button.frame-1gk");
    } else {
        console.log("Frame with name 'Message bubble' not found.");
    }
}

async clickonthestoreswitcher() {
  await this.page.getByRole('button', { name: 'DE_de' }).click();
}

async switchtofrfrstoreview() {
  await this.page.click("a[href='/fr-fr/']");
}

async switchtoatdestoreview() {
  await this.page.click("a[href='/at-de/']");
}

async switchtochdestoreview() {
  await this.page.click("a[href='/ch-de/']");
}

async switchtonlnlstoreview() {
  await this.page.click("a[href='/nl-nl/']");
}

async switchtoesesstoreview() {
  await this.page.click("a[href='/es-es/']");
}

async switchtoplplstoreview() {
  await this.page.click("a[href='/pl-pl/']");
}

async switchtodeenstoreview() {
  await this.page.click("a[title='Europe']");
}

}
