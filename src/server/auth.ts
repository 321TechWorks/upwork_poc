import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { owners } from "./db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter any email e.g test@example.com",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email) {
          throw Error("No email");
        }

        let owner = await db.query.owners.findFirst({
          where: (owner, { eq }) => eq(owner.email, credentials.email),
        });

        if (!owner) {
          const ownerAttrs = {
            name: "Test Test",
            email: credentials.email,
            address: "123 Main St, City, Country",
            phone: "+1234567890",
          };

          const result = await db.insert(owners).values({
            ...ownerAttrs,
          });

          owner = {
            ...ownerAttrs,
            id: result[0].insertId,
          };
        }

        if (owner) {
          return {
            id: String(owner.id),
            name: owner.name,
            email: owner.email,
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABJKSURBVHgBrVlZcFvndf7uxQ6CJEBwg0hRXERtlkRKjuVFtqTEbho7cS3FaZ3Y7dSaJhln0lbuQ2Y60wdRbTrjaV/kmfQh7kPleibj5qHSjNvEsV1bspVYlrVQFiVSMkmA+wKSAAlivcD9+/0X2wUly5aTK5EAgYt7z/Kd73znQMEf4IhEIl6LJXdQEZYeIXLtOtReQHgV/ojSWUoIqggpQvRrurhige20z+cL4fc8FHzJQxptVXEkJ8QBXuQAoBcuJ/iPj4oo/FV5CCGKT+Tv/lwOL1ssX96Zu3ZAGq5a9SO090Va581bKYwrFZ+K211Z5F/LOyDKnonCGwpOALZjd+vIXTkQW148mhM0XBHe0gWKAVXKlxNCR2IlitnxEVR761Fb3wC7041SSgQqnSh8NO+K0ufzNRzDH9IBRr1dVbMneXqvKFld+GjJCJkFBdl0Glc/eBMDH53FpyNjiCVScHk8aG1rg9/nxa5HHsWmHfdCmIw3Z6zgY0hB7qs+XyCE39eBlZWFvxS6clxA9yo0sBIelSjXNQ3Xfvsmglcv4cOPr2B4ahFZXYf8nFVVkMxoxkee/va38dwPfwyrzXGLA6bsRHWRO1xfv+7UnexT7/TmMiFDNJwQEjJKKccmo8vGy8hf+91vMHrpHLxuFxo8Loichngyg9VkCtF4ErmcjmRKw8mTp/Dqz38GLZu59aalxEoWU09GFueO3slG6x2Nh+hTYIJuKeBKGfyF6g1dv4S54KfY/eA+A/fyvLHJWRqdMGrCoqjgf7gtVtQ4VJz5zZtobWnF1w89s+bOwlQnzKoQfYuLc/D7m25bF7eFUGRlgZyOk/iCR07L4Oyp/8TWe3rQuK4duUwSsfkpXD37LiYnp2FnDfhrq+Gw2ZBJJZFKJ7GcSOODm9M4/h+/gCo9U4o2M2y6KPlhJN54Q32+vr7x1c91QBasouYu5ylS4IvU+dJUEPGFadTXN8PlciNHaGRTKWiry0jGY0hnUvQyy/8aMok4YksL0HiD8wM38Z2/+Qc0rVtfQqikWUUX5YzLR1lHQNRiVXatLexba0DR3uNFvPIS5Z5j/PWZDih6Di7SpGpRjXN1Yl1RCRm7AzabnREmOSoWFrl0LEmDskAmg86WZgxfHzBF37hb6blSgFKePBRvVhO3oKLCgeVI+Cg/1J7vRvlPS+/L3UmUGxHK0cll0qiqqiHT2Fi4OSxOBDEVHOVPCGlGnECGQuyrFgvvqBq40OmEy26Fkl41DC3mWTFl3MiAUqwJ4569c3NTfWabS0UsoaOLbF+pZGXUhChTnMhLBEUpR0q+kaXxFlKk3emETuiEQ8NYXlxAeH4ek2PjqPfVoGvrNjqaM6I9s7QCv8cBb42bWbLlL12iUFHRH5SS3YUsSHipypFIJHjc5+uIVmZA147mjdIrPykKUTFuoufhZE4CGcbhcMHKCGeSCVh5o0wsiqXpCTS6FGy7dw88Xh+is1MIT03AlstgeTWBa0NBaKwLp8NW0ZEVYQZTHlv5e5ag5c1knC8Wz1GL0ee5z5f8rtBbec8ruk3xYvEVqFoKVquNuNdg0dLQYhG+pyKuCQzeGIWWjMFOp2ZDo4guLWMpugKwuNfX1yDJ/uCs9pYN1NdWml6qCDOdKIp+JBgJessQymkHhKUMNzPvKObyFaZ3CZeV374Bd3cv1KpqiKwOO+ugvn0zYX4TDnShet/DqAu0QluOgNVBc1SyUhzJVQGN0OvqbYa3MVCiyuJjKVY6KrIjyurF685YZRb68g5YlCMG3s39qZRG00UUpdTU9NUV6MRwaiYIa2sXbHYXLA43rIRFVbWPTljgqmuCja+lsvOwWy34yo5NyIFsxD6g6RlmzgoHmcrAtpHpYtBQlt3lSFY+VZT98kE14CNEr/GaMBVUhfNK+cKFV1SmXrXbsTp83eB2WcCSgdKxZSxShcajS1AY5VSCxpI65WdTjH5tDZtaYxMcVVXGdYZ/+W9Yunoea4N2C2mLIkJEEdIHIsGg12qGT8mJgrWKqHRFmNQDSInOzh1Ie/ws2BD8rR1sYgLXz53B2NgoPITV0NAgDfYhl47j8uAI1jf7WdA1cNfUwm53GjBCdBmpZPqWiCuF4jVH3kwe8kFz2g5adQW9qrltV3h7ax82n2NpWo9Lvz6JlkATqlOS73VcvfwxojRqfaOfQi6JkVgKKpvZ4NwChhei6FyMYu+enchRPixOzaHOUY2G7b2VuvaWUU4pWa+YfuuK6JUqt0eslfao1JtmJ8x1rBLD2/d/E8ufXkaChZpWl1Hf4MfEXBwtO/di665dWCL73Pz4PCzZHD6ZWsDF0WkEGn2ora1BOBLDAy98HzZ3tZm1jeDpJkNMvRmVABPtKo1vr7C6aKBpwECFA8KQxWlSYJb6vrF9Izxt3QjPThsn1xPfTz/zJ+yyLoQGh1jApNeW9Yg6PZzpLejyVVN6ZDE+PYcpzYKGzT3IdxpTnSlYS4WmecHcnyw9koXasebckudmSMmIq1bc6P+YDWmKIcrB7vaQfRxQ9TRmJqfgb14HCzvy6tI8unoeRIKibf7mEKpYyPfUVKFzdycntLgxIywncpzOHsDC3Cy8dX5YSQhFBVq8PypsEQWaNeGLc4qytDQvPlNwFrKRD4CKaHgeZ07+wnCsqsYLt4d0ySbmpXH29ALe/9X/UPusotHvQ6ClBeG5eZy9MABftRvd6xsxOj6DFJlKYyD8JIBqGp5inTQ0NeJrTx6Cr76pzIK6KGW81MrMcCo8qEXcrH2jlI0CrKS6tFEypNhxE4SPYmHEaLyLLONyVyHQ2oaWzo0Yn10kPOYxfPMGCSZmGJ8m1IZnFhBaimF8KY76LfehpXsbr2Ezrjs1MYmbA1eR4VRXil1pg1E0RqnsBUrJASVqxmAFbVUUt4JqXwPaurdjYnoaFy9dxCQfKa7gdtuNK35l3wF079iF6xNhFvICpsOLyJCZktksBsZmMbOcwraOdejYsh0WDjfyMxk6Z2EgEqurDEyixIAVoLjtH3koUbQjujbyaz9TLC95Su/eR2F3udC5ZRueOHgIydAnSHKYkdi0O6vw5J/+Gdo7OhCaX8W1iQVcm1zEJKMeSWRx/z0b0NHSADWbQK23FnNzc9RGEcRTafaHOiTiiTKDCpPyLRSiMMkCA1qKEpIQ6oe4dVwxc7IoJEtewOmqxsFnf4AH99ERpwvV1DLpZByK1WFAQtbGX3z/MHbt7oXOrYPN4eQ868PT+3uwo6OZxeqEneetb9uAnvseQHQlxlnCg7qmpvy9TCxS0TiFUghh+WD/ClnZ/sc4aZiFN9YeSmGiKkagtXMzVqNhpNMZDA9ex8P79xr1IEdBhQXaEGjD09/7Lh7ZO4wUNVN8KUypHTdGSp0NzOWykdHI311d6KHc3rZ9B+2zGpNbwfSy4lUqwlkRYq5srlh5y/485kSeogxhJUqOSKMt1oLmY75yslp0lQxUh/jqoqH1Ne6D3DIIqpy8VDkiMPJVqOF7TtJsJhGDRgEnBd5yJILQ796HgwxmIwHseXifsbXLUYq7PY356Q1lOVOS8qVsFOcRSatKP6c856nSJFQaJZHX5oWL2WxOSh+lMNnlX5Nd2OX2YeO9ezF2c5BCLYb8eCEMY+XORypUhTCS58qiFaqc4DK40D+IBRa4x1ODKo/XGIqM93W9dI9yoIvWl/VYaajihlvlMjXK56crkmP6vEq8SkqWPzlqfp1PdJGHlZUap751Mxz17Zi4cQVJ9gBJhenkKtIcWrJsdkkOODLysl7S6SyWY0k4mCx/YD0VaQ3PyRh7IzlyzpLVUpKJKqCjlPevKL+lqKI/EAiE1LzB4ozxaKZQtvv4xBiuvv4azr32KqZHRo0LWAgR+SMdUMnhdocDG/f8EVzrtiJ47RJWFueN3U+WRmVSCUpuZsBmRZybuYnpBaxqKn749/+I1o1baGycEpwBYeT1bH76mhibYPa08hxSmFOKLggUs6S8XPJTrsz1XCZY3DrnSGsTZ89SEixg5uYwGrj+OD8whK5vPA0bI/nQQ3s4A1uMGxcvq7Ggw2NDmLj4Dvz1PkNiSGgkGdGlqXEMXhtCAm586wc/gae+Hgk5Q0jI6JqRIXmN2bEQfvnSv5CRWrHlwftx8PBzvI695IwoNlzjhVxHINARKvkWDs/0rcbiRz84+TZci7Po2tiE4NBNLp2acPHCJ4gwUh1f/xbOXeAAwzn4sUcPYPfuHfB5vchSacrNRJKyYG5iBNMX3kZqkRs54trhdmNsNARbUzcefe4FJJiVVDrBSczF4k8Z7JbjoD9w/iP81/Hj8FMnNXK3ukha7t65HX/+z8fgJs0WAyX/kStONAXaDpcyII9g8LL3zCtvBMMD170x0p7bX4Oe3m4McDBf17UBl68Gscqh5crQBHGeYsqT1Dd1+KsX/hrdGzvhdNoNlRqNhAkxC6787+uYH/wYnVu3wh7YjLbd+w0dHyX9cv9vkFya15kIjeC1V/4dYnYSHisnvOlZ9g8bWnmNTHMj2nbtxrN/97dwcOMnirJH2Dok/qXdlqIDL7/889ROt8+ViMwdiBBC4WgUIWoal9eNjY89DsH1x9QCu+pM2FCiNVVWPPCVHqyjBjIKm8bbHDajGGWRt92zmw7laMA+NGzqoVN2o27SjL6d8Lp44Tx+/cYpvH/qFBaD4ySIHDZvbEMssgIL5cW0y4EHd27ChxcHkGIRbOvdWSAYcSwQaC2t3C0wHWdGBk9vr288OJ+MNbNUOTJ2onlXL9o3bWIdrMNHrIsEdz419gy++53HYaOh9YEAPNVVxtZNNiK5qJWZqCZFuptbIUijcoEls2LlYD81OY6zp9/Fe2+9i4DPT4i5MM1FsJ1buploDNUcdOq62tHM5de566MGLMdnZ7GHG44qjycUCLQdMtt8y260bUvLIc2qRFv23I+2+/bg07Epo/L7r5C7l+P8lsWDrZu74OQiSyxHeYMYo88aKDQ+Ka89NTXI6bIuJL7zS93FhTB/5ijesnzdgcf/+GuYHh/FJ/2XoLFPdO/YDoVaKtDcBPeGdnx0cxIpfpdgIREscP4489Y7UQjLV9faa1n7wv8NDEVf/PELc57OzQfl0B0KjmGUSjKV0REnz3vcDjTQCU+tD3XEqlJdjTp/o0GnTjKUaqwAlXxGVAmZtFFqCX7V5KmpNgZ4PZvG+bffwND16wj46+Bg1qzcbKeWlpBwc+DnPdKkVW1l2cB8U60bjuqq7z31zLPn1tp7229oftT3Tyc6NgSOJVNyDZiETdHx9gcXcHVohLKCyynWiK/OB+FyIhGJsqHZjJ4gpbWdnK9l08aNJZVKGSL3P3V1dXSOuyK3E8nlMPwNDfByegvOsK5mOSuMz2IwHKP8qMHc/AJ8ra1o2LAB65v82OirPfbTn71y26+aPvMrpm8+9WTf1PT8sVreMCPyX2JIAxa4nM1pWa5LauClgoxNTTLyTiPaKGgo+SxPrRbOCh7CJmW8JzXTLPejE4TECjMSXl7lalKjg2SfyDLpsgpnz/djaSlqtP6HHt3H4KjHfvrO2b7PstOCOxwXL3542iOcV9q2bPnGyOiYU2qQTZ2tZKJZA0J2/i2H++6e3fKrIIOUZQYy1DvSDZs9v7hNp5MGI8nhJTgygsGhGxgnNDU6YJN0anXCwUlPcM6QBECMIZ1KRBmsH5148+3jd7LRis85Phw8f2r/U0/073tw53tsdO3SplUZPYqxmZtcVrWtp8YnhBhxjZnJ2YUBGwtltaGX+FwlC2WzCSMLFrnFZkYCnIPTU9Nccrqxqasbbf5aXImuct5wwYl0//D0xKHXT/136PPs+1wH5PHSS30hPnQ8fOCJvsceuffo/OwMKc2F+bExNG/Yaxip6fnVu6FjpLZRhBF1C2vDwQLXtHwW3FUu1HiqOCvcj7foQAsduTI6jPC1FCIWSzRtdbx87vonffiCh4q7OM6e/lXfhs7Ojt7tW17dsnEDkisRoxglXGRk7WxkRbVakuiysKlnVGNoynE6qyMNb8IK4SPhtjAwCHdkKeoV2WO7MumOuzFeHl8oA+bj8OHDIT48Hxy83Je4eu1AS3vnEarTXmNCysLoxDDtNCWtyu/JFDpgpcG1tV5MXupHQ20V/JGV0yysMzes9uOnR0NRfInjrh0oHh1bd4X4cAIv/euJmZmZdl2xHMjpeq+WyfTQofZ0Wm+XdSCrlP5EyUhRUm2/BmUsyUmqfl3HqZ8MvPqljDYf/w/PESW91K1aYAAAAABJRU5ErkJggg==",
          };
        }

        return null;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
